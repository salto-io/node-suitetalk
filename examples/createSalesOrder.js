const Configuration = require("../app/configuration");
const Service = require("../app/service");
const Record = require("../app/record");

const credentials = require("./credentials");
const config = new Configuration(credentials);
const service = new Service(config);

service
    .init()
    .then((/*client*/) => {

        const salesOrderRecord = new Record.Types.Record("tranSales", "SalesOrder");

        salesOrderRecord.externalId = "store-10001";

        const b0 = new Record.Fields.RecordRef("entity");
        b0.internalId = 345678;
        b0.type = "customer";

        const b1 = new Record.Fields.Field("string", "orderStatus", "_pendingFulfillment");

        const b2 = new Record.Fields.RecordRef("location");
        b2.internalId = 999;

        const b3 = new Record.Fields.Field("number", "shippingCost", 0);

        const b4 = new Record.Fields.Field("boolean", "isTaxable", false);

        salesOrderRecord.bodyFieldList.push(b0, b1, b2, b3, b4);

        // Clear lists
        salesOrderRecord.nullFieldList = new Record.Lists.NullFieldList();
        salesOrderRecord.nullFieldList.names.push("salesRep");

        // Custom fields
        salesOrderRecord.customFieldList = new Record.Lists.CustomFieldList();

        const c1 = new Record.Fields.CustomFieldRef("StringCustomFieldRef", "string");
        c1.scriptId = "custbody_number";
        c1.value = "321321321";

        salesOrderRecord.customFieldList.customFields.push(c1);

        // Create Item List
        const salesOrderItemList = new Record.Lists.List("SalesOrderItemList", "itemList");
        salesOrderItemList.replaceAll = true;

        // Create Item
        const salesOrderItem1 = new Record.Lists.Line("SalesOrderItem", "item");

        const a1 = new Record.Fields.RecordRef("item");
        a1.type = "account";
        a1.internalId = 99999;

        const a2 = new Record.Fields.Field("number", "quantity", 1);

        const a3 = new Record.Fields.RecordRef("price");
        a3.type = "priceLevel";
        a3.internalId = -1;

        const a4 = new Record.Fields.Field("number", "amount", 99.95);

        const a5 = new Record.Fields.Field("number", "rate", 99.95);

        const a6 = new Record.Fields.Field("boolean", "isTaxable", false);

        salesOrderItem1.bodyFieldList.push(a1, a2, a3, a4, a5, a6);

        const salesOrderItem2 = new Record.Lists.Line("SalesOrderItem", "item");

        const a7 = new Record.Fields.RecordRef("item");
        a7.type = "account";
        a7.internalId = 88888;

        const a8 = new Record.Fields.Field("number", "quantity", 2);

        const a9 = new Record.Fields.RecordRef("price");
        a9.type = "priceLevel";
        a9.internalId = -1;

        const a10 = new Record.Fields.Field("number", "amount", 30.00);

        const a11 = new Record.Fields.Field("number", "rate", 15.00);

        const a12 = new Record.Fields.Field("boolean", "isTaxable", false);

        salesOrderItem2.bodyFieldList.push(a7, a8, a9, a10, a11, a12);

        // Add Addressbook to list
        salesOrderItemList.list.push(salesOrderItem1, salesOrderItem2);

        // Add sublist to customer
        salesOrderRecord.lineList.push(salesOrderItemList);

        return service.add(salesOrderRecord);
    }).then((result) => {

    console.log("result");
    console.log(JSON.stringify(result));

}).catch(function (err) {
    console.log("error");
    console.log(service.config.client.lastRequest);
    console.log("message");
    console.log(JSON.stringify(err));
});