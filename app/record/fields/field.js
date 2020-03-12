"use strict";

const BaseObject = require("../../baseObject");

class Field extends BaseObject {

    constructor(typeName, name, value) {
        super(undefined, typeName);
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

        if (typeof this._value !== this._typeName) {
            throw new Error(`Invalid type value ${typeof this._value} for field ${this._name}`);
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
