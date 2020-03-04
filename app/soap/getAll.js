"use strict";

const BaseObject = require("../baseObject");

class GetAll extends BaseObject {

    constructor() {
        super();
    }

    _getSoapType() {
        return "record";
    }

    _getAttributes() {
        return {
            "recordType": this.type,
        };
    }

    getNode() {

        const attributes = this._getAttributes();
        const type = this._getSoapType();

        if (!type) {
            throw new Error(`Invalid SOAP type ${type}`);
        }

        const node = {};

        node[type] = {};

        if (attributes) {
            node[type]["$attributes"] = attributes;
        }

        return node;
    }
}

module.exports = GetAll;
