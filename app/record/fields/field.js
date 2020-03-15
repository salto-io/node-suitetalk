"use strict";

const BaseObject = require("../../baseObject");

class Field extends BaseObject {

    constructor(name, value) {
        super();
        this._name = name;
        this._value = value;
    }

    _getSoapType() {
        return `${this._familyType}:${this._name}`;
    }

    _getAttributes() {
        return "";
    }

    getNode() {

        if (!this._name) {
            throw new Error("Field _name not defined");
        }

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

        node[type]["$value"] = this._value;

        return node;
    }
}

module.exports = Field;
