"use strict";

const Record = require("./common/record");

class CustomRecord extends Record {

    constructor() {
        super("setupCustom", "CustomRecord");
        this.typeId = undefined;
        this._isCustomRecord = true;
    }
}

module.exports = CustomRecord;
