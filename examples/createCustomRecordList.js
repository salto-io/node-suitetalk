const Configuration = require("../app/configuration");
const Service = require("../app/service");
const Record = require("../app/record");

const credentials = require("./credentials");
const config = new Configuration(credentials);
const service = new Service(config);

service
    .init()
    .then((/*client*/) => {

        const customRecord = new Record.Types.CustomRecord();

        customRecord.typeId = 496;

        // Set regular fields
        const b1 = new Record.Fields.Field("string", "name", "test6");

        customRecord.bodyFieldList.push(b1);

        const customRecord2 = new Record.Types.CustomRecord();

        customRecord2.typeId = "496";

        // Set regular fields
        const b2 = new Record.Fields.Field("string", "name", "test2");

        customRecord2.bodyFieldList.push(b2);

        return service.addList([customRecord,customRecord2]);
    }).then((result) => {

    console.log("result");
    console.log(JSON.stringify(result));

}).catch(function (err) {
    console.log("error");
    console.log(service.config.client.lastRequest);
    console.log("message");
    console.log(JSON.stringify(err));
});