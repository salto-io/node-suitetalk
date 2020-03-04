"use strict";

const BaseObject = require("../baseObject");

class GetCustomizationId extends BaseObject {

    constructor() {
        super();
        this.includeInactives = true
    }

    _getSoapType() {
        return "customizationType";
    }

    _getAttributes() {
        return {
            "getCustomizationType": this.type,
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

        node["includeInactives"] = this.includeInactives;
        return node;
    }
}

module.exports = GetCustomizationId;
