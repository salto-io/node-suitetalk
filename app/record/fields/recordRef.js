"use strict";

const BaseObject = require("../../baseObject");

class RecordRef extends BaseObject {

    constructor(name) {
        super();
        this.type = undefined;
        this.internalId = undefined;
        this.externalId = undefined;
        this._name = name;
    }

    _getSoapType() {
        return `${this._familyType}:${this._name}`;
    }

    _getAttributes() {

        const attr = {
            "externalId": this.externalId,
            "internalId": this.internalId,
            "type": this.type,
            "xsi:type": "platformCore:RecordRef",
        };

        if (!this.externalId) {
            delete attr.externalId;
        }

        if (!this.internalId) {
            delete attr.internalId;
        }

        if (!this.type) {
            delete attr.type;
        }

        return attr;
    }

    getNode() {

        if (!this.internalId && !this.externalId) {
            throw new Error("Neither internalId nor externalId are defined");
        }

        const attributes = this._getAttributes();
        const type = this._getSoapType();

        if(!type){
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

module.exports = RecordRef;
