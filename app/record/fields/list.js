"use strict";

const Field = require("./field");

class List extends Field {

    constructor(typeName, name) {
        super(undefined, typeName);
        this.replaceAll = true;
        this.list = [];
        this._name = name;
    }

    _getSoapType() {
        return `${this._familyType}:${this._name}`;
    }

    _getAttributes() {
        return {
            "replaceAll": this.replaceAll,
            "xsi:type": `${this._familyType}:${this._typeName}`,
        };
    }

    getNode() {

        const attributes = this._getAttributes();
        const type = this._getSoapType();

        if(!type){
            throw new Error(`Invalid SOAP type ${type}`);
        }

        const node = {};

        node[type] = [];

        if (attributes) {
            node[type]["$attributes"] = attributes;
        }

        this.list.forEach((el) => {
            if (!el._familyType) {
                el._familyType = this._familyType;
            }
            node[type].push(el.getNode());
        });

        return node;
    }
}

module.exports = List;
