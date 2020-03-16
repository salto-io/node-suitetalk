"use strict";

const Field = require("./field");

class Line extends Field {

    constructor(typeName, name) {
        super(undefined, typeName);
        this.bodyFieldList = [];
        this.subRecordList = [];
        this._name = name;
    }

    _getSoapType() {
        return `${this._familyType}:${this._name}`;
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

        this.bodyFieldList.forEach((el) => {
            if (!el._familyType) {
                el._familyType = this._familyType;
            }
            Object.assign(node[type], el.getNode());
        });

        this.subRecordList.forEach((el) => {
            if (!el._familyType) {
                el._familyType = this._familyType;
            }
            Object.assign(node[type], el.getNode());
        });

        return node;
    }
}

module.exports = Line;
