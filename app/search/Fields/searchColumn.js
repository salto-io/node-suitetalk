"use strict";

const BaseObject = require("../../baseObject");

class SearchColumn extends BaseObject {

    constructor(familyType, typeName) {
        super(familyType, typeName);
        this._name = "";
    }

    _getSoapType() {
        return `platformCommon:${this._name}`;
    }

    _getAttributes() {
        return {
            "xsi:type": `${this._familyType}:${this._typeName}`,
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

module.exports = SearchColumn;
