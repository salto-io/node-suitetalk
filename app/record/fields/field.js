"use strict";

const BaseObject = require("../../baseObject");

class Field extends BaseObject {

    constructor(name, value) {
        super(name, value);
    }

    getNode() {
        return super.getNode();
    }
}

module.exports = Field;
