"use strict";

const BaseObject = require("../../baseObject");

class SubRecord extends BaseObject {

    constructor(familyType, typeName, name) {
        super(familyType, typeName);
        this._name = name;
        this.bodyFieldList = [];
    }

    _getSoapType() {
        return `${this._familyType}:${this._name}`;
    }

    _getAttributes() {
        return "";
    }

    getNode() {

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

        this.bodyFieldList.forEach((el) => {
            if (!el._familyType) {
                el._familyType = "platformCommon";
            }
            Object.assign(node[type], el.getNode());
        });

        return node;
    }
}

module.exports = SubRecord;
