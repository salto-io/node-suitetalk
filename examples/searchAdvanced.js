const Configuration = require("../app/configuration");
const Service = require("../app/service");
const Search = require("../app/search");
const Soap = require("../app/soap");

const credentials = require("./credentials");
const config = new Configuration(credentials);
const service = new Service(config);

service
    .init()
    .then((/*client*/) => {

        // Set request level preferences
        const preferences = new Soap.RequestPreferences();
        preferences.warningAsError = true;
        service.setRequestPreferences(preferences);

        // Set search preferences
        const searchPreferences = new Search.SearchPreferences();
        searchPreferences.pageSize = 100;
        service.setSearchPreferences(searchPreferences);

        // Create advanced search
        const search = new Search.Advanced.SearchAdvanced("listAcct", "LocationSearchAdvanced");

        // Add criteria
        search.criteria = new Search.Advanced.SearchRow("listAcct", "locationSearchRow");
        search.criteria.basic = new Search.Advanced.SearchRowBasic("listAcct", "locationSearchRowBasic");

        // Name contains 'warehouse'
        const nameStringField = new Search.Fields.SearchField("platformCore", "SearchStringField");
        nameStringField._name = "name";
        nameStringField.operator = "contains";
        nameStringField.searchValue = "warehouse";
        search.criteria.basic.searchCriteriaFields.push(nameStringField);

        // Add columns
        search.columns = new Search.Advanced.SearchRow("listAcct", "locationSearchRow");
        search.columns.basic = new Search.Advanced.SearchRowBasic("listAcct", "locationSearchRowBasic");

        // Internal ID column
        const internalIdSelectColumn = new Search.Fields.SearchColumn("platformCore", "SearchColumnSelectField");
        internalIdSelectColumn._name = "internalId";
        search.columns.basic.searchColumnFields.push(internalIdSelectColumn);

        // Name column
        const nameStringColumn = new Search.Fields.SearchColumn("platformCore", "SearchColumnStringField");
        nameStringColumn._name = "name";
        search.columns.basic.searchColumnFields.push(nameStringColumn);

        return service.search(search);
    }).then((result) => {

    console.log("result");
    console.log(JSON.stringify(result));

}).catch(function (err) {
    console.log("error");
    console.log(service.config.client.lastRequest);
    console.log("message");
    console.log(JSON.stringify(err));
});