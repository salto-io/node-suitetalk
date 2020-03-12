"use strict";

const BaseObject = require("../../baseObject");

class SearchField extends BaseObject {

    constructor(familyType, typeName) {
        super(familyType, typeName);
        this._name = undefined;
        this.operator = undefined;
        this.searchValue = undefined;
    }

    _getSoapType() {
        return `platformCommon:${this._name}`;
    }

    _getAttributes() {
        return {
            "operator": this.operator,
            "xsi:type": `${this._familyType}:${this._typeName}`,
        };
    }

    getNode() {

        const attributes = this._getAttributes();
        const type = this._getSoapType();

        if (!type) {
            throw new Error(`Invalid SOAP type ${type}`);
        }

        if (!this._name) {
            throw new Error("search criteria _name not set");
        }

        if (!this.operator) {
            throw new Error("search criteria operator not set");
        }

        if (!this.searchValue) {
            throw new Error("search criteria searchValue not set");
        }

        const node = {};

        node[type] = {};

        if (attributes) {
            node[type]["$attributes"] = attributes;
        }

        node[type]["platformCore:searchValue"] = {};
        node[type]["platformCore:searchValue"]["$attributes"] = {};
        node[type]["platformCore:searchValue"]["$attributes"][this._name] = this.searchValue;

        return node;
    }
}

module.exports = SearchField;
