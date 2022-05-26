console.log("This is working!");
(function () {
  var myConnector = tableau.makeConnector();

  myConnector.getSchema = function (schemaCallback) {
    const covidCols = [
        {
            id: "externalId",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "organisation",
            alias: "organisation",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "owner",
            alias: "owner",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "parent",
            dataType: tableau.dataTypeEnum.bool
        },
        {
            id: "taskName",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "status",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "location",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "trade",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "totalQuantity",
            dataType: tableau.dataTypeEnum.int
        },
        {
            id: "actualQuantity",
            dataType: tableau.dataTypeEnum.int
        },
        {
            id: "quantityUnits",
            dataType: tableau.dataTypeEnum.int
        },
        {
            id: "percentComplete",
            dataType: tableau.dataTypeEnum.float
        },
        {
            id: "baselineStartDate",
            dataType: tableau.dataTypeEnum.datetime
        },
        {
            id: "baselineEndDate",
            dataType: tableau.dataTypeEnum.datetime
        },
        {
            id: "plannedStartDate",
            dataType: tableau.dataTypeEnum.datetime
        },
        {
            id: "actualStartDate",
            dataType: tableau.dataTypeEnum.datetime
        },
        {
            id: "plannedEndDate",
            dataType: tableau.dataTypeEnum.datetime
        },
        {
        id: "totalActualWorkers",
        dataType: tableau.dataTypeEnum.int
    },
    {
        id: "totalPlannedWorkers",
        alias: "totalPlannedWorkers",
        dataType: tableau.dataTypeEnum.int
    },
    {
        id: "notes",
        alias: "notes",
        dataType: tableau.dataTypeEnum.string
    }
    ,{
        id: "description",
        alias: "description",
        dataType: tableau.dataTypeEnum.string
    },
    {
        id: "taskType",
        alias: "taskType",
        dataType: tableau.dataTypeEnum.string
    },
    {
        id: "baselineDuration",
        alias: "baselineDuration",
        dataType: tableau.dataTypeEnum.int
    },
    {
        id: "actualDuration",
        alias: "actualDuration",
        dataType: tableau.dataTypeEnum.int
    },
    {
        id: "plannedDuration",
        alias: "plannedDuration",
        dataType: tableau.dataTypeEnum.int
    },
    {
        id: "actualEndDate",
        alias: "actualEndDate",
        dataType: tableau.dataTypeEnum.datetime
    },
    ];

    let covidTableSchema = {
      id: "RIVM",
      alias: "Dutch Corona Cases since start",
      columns: covidCols,
    };

    schemaCallback([covidTableSchema]);
  };

  myConnector.getData = function (table, doneCallback) {
    let tableData = [];
    var i = 0;

    $.getJSON(
      "https://go.visilean.com/VisileanAPI/resource/powerBi/getData/B437C721-D701-60F1-B60D-A07E5336867C/f67057fd96e8b8f3bce78dc6a684e2eb/visilean",
      function (resp) {
        // Iterate over the JSON object
        for (i = 0, len = resp.length; i < len; i++) {
          tableData.push({
            "externalId": feat[i].externalId,
                "organisation": feat[i].organisation,
                "owner": feat[i].owner,
                "parent": feat[i].parent,
                "taskName": feat[i].taskName,
                "status": feat[i].status,
                "location": feat[i].location,
                "trade": feat[i].trade,
                "totalQuantity": feat[i].totalQuantity,
                "actualQuantity": feat[i].actualQuantity,
                "quantityUnits": feat[i].quantityUnits,
                "percentComplete": feat[i].percentComplete,
                "baselineStartDate": feat[i].baselineStartDate,
                "baselineEndDate": feat[i].baselineEndDate,
                "plannedStartDate": feat[i].plannedStartDate,
                "actualStartDate": feat[i].actualStartDate,
                "plannedEndDate": feat[i].plannedEndDate,
                "actualEndDate": feat[i].actualEndDate,
                "plannedDuration": feat[i].plannedDuration,
                "actualDuration": feat[i].actualDuration,
                "baselineDuration": feat[i].baselineDuration,
                "taskType": feat[i].taskType,
                "description": feat[i].description,
                "notes": feat[i].notes,
                "totalPlannedWorkers": feat[i].totalPlannedWorkers,
                "totalActualWorkers": feat[i].totalActualWorkers
          });
        }
        table.appendRows(tableData);
        doneCallback();
      }
    );
  };

  tableau.registerConnector(myConnector);
})();

document.querySelector("#getData").addEventListener("click", getData);

function getData() {
  tableau.connectionName = "Dutch Corona Numbers";
  tableau.submit();
}