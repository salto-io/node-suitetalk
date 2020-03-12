const Configuration = require("../app/configuration");
const Service = require("../app/service");
const Record = require("../app/record");

const credentials = require("./credentials");
const config = new Configuration(credentials);
const service = new Service(config);

service
    .init()
    .then((/*client*/) => {

        const customerRecord = new Record.Types.Record("listRel", "Customer");

        // Set regular fields
        const b1 = new Record.Fields.Field("boolean", "isPerson", true);

        const b2 = new Record.Fields.Field("string", "firstName", "TESTJohnSample2");

        const b3 = new Record.Fields.Field("string", "lastName", "Doe");

        customerRecord.bodyFieldList.push(b1, b2, b3);

        // // Clear lists
        customerRecord.nullFieldList = new Record.Lists.NullFieldList();
        customerRecord.nullFieldList.names.push("salesRep");

        // Custom fields
        customerRecord.customFieldList = new Record.Lists.CustomFieldList();

        const c1 = new Record.Fields.CustomFieldRef("StringCustomFieldRef", "string");
        c1.scriptId = "custentity_twitter";
        c1.value = "@test";

        customerRecord.customFieldList.customFields.push(c1);

        // Create Addressbook List
        const addressBookList = new Record.Lists.List("CustomerAddressbookList", "addressbookList");
        addressBookList.replaceAll = true;

        // Create Addressbook
        const addressBook = new Record.Lists.Line("CustomerAddressbook", "addressbook");

        // Addressbook body
        const a1 = new Record.Fields.Field("boolean", "defaultBilling", true);

        const a2 = new Record.Fields.Field("boolean", "isResidential", true);

        const a3 = new Record.Fields.Field("boolean", "defaultShipping", true);

        addressBook.bodyFieldList.push(a1, a2, a3);

        // Addressbook subrecord
        const address = new Record.Lists.SubRecord("listRel", "Address",
            "addressbookAddress");

        const s1 = new Record.Fields.Field("string", "addressee", "John Doe");

        const s2 = new Record.Fields.Field("string", "addr1", "11 Fake Rd");

        const s3 = new Record.Fields.Field("string", "city", "Beverly Hills");

        const s4 = new Record.Fields.Field("string", "zip", "90210");

        const s5 = new Record.Fields.Field("string", "state", "CA");

        const s6 = new Record.Fields.Field("string", "country", "_unitedStates");

        address.bodyFieldList.push(s1, s2, s3, s4, s5, s6);

        // Add subrecord to addressbook
        addressBook.subRecordList.push(address);

        // Add Addressbook to list
        addressBookList.list.push(addressBook);

        // Add sublist to customer
        customerRecord.lineList.push(addressBookList);

        return service.add(customerRecord);
    }).then((result) => {

    console.log("result");
    console.log(JSON.stringify(result));

}).catch(function (err) {

    console.log("error");
    console.log(service.config.client.lastRequest);
    console.log("message");
    console.log(JSON.stringify(err));
});