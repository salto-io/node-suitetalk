"use strict";

const Field = require("./field");

class CustomFieldRef extends Field {

    constructor(familyType, typeName) {
        super(familyType, typeName);
        this.scriptId = undefined;
        this.internalId = undefined;
        this.value = undefined;
    }

    _getSoapType() {
        return "platformCore:customField";
    }

    _getAttributes() {

        const attr = {
            "scriptId": this.scriptId,
            "internalId": this.internalId,
            "xsi:type": `platformCore:${this._familyType}`,
        };

        if (!this.scriptId) {
            delete attr.scriptId;
        }

        if (!this.internalId) {
            delete attr.internalId;
        }

        return attr;
    }

    getNode() {

        if (!this.scriptId && !this.internalId) {
            throw new Error("Neither internalId nor scriptId are defined");
        }

        if (!this._typeName) {
            throw new Error("Invalid cast. Must use a type reference");
        }

        if (this._typeName !== "*" && typeof this.value !== this._typeName) {
            throw new Error(`Invalid type value ${typeof this.value} for custom field`);
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

        node[type]["$value"] = this.value;

        return node;
    }
}

module.exports = CustomFieldRef;
