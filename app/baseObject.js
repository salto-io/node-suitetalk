"use strict";

class BaseObject {

    /**
     * _familyType & _typeName are used for templating
     */
    constructor(familyType, typeName) {
        this._familyType = familyType;
        this._typeName = typeName;
    }

    _getSoapType() {
        return "";
    }

    /**
     * Attributes added to the SOAP node
     */
    _getAttributes() {
        throw new Error("Must be implemented by subclass");
    }

    /**
     * Get SOAP node tree to be passed onto node-soap
     * @return {object}
     */
    getNode() {
        return "";
    }
}

module.exports = BaseObject;
