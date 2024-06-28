"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXPORT_TYPE = exports.VIEW_NAME = exports.VIEW = exports.VALUE = exports.STRING = void 0;
var STRING;
(function (STRING) {
    STRING["empty"] = "";
    STRING["space"] = " ";
    STRING["newLine"] = "\n";
    STRING["dash"] = "-";
    STRING["underscore"] = "_";
    STRING["plus"] = "+";
    STRING["zero"] = "0";
    STRING["colon"] = ":";
    STRING["comma"] = ",";
})(STRING || (exports.STRING = STRING = {}));
;
var VALUE;
(function (VALUE) {
    VALUE[VALUE["notFound"] = -1] = "notFound";
})(VALUE || (exports.VALUE = VALUE = {}));
;
var VIEW;
(function (VIEW) {
    VIEW[VIEW["map"] = 1] = "map";
    VIEW[VIEW["chart"] = 2] = "chart";
    VIEW[VIEW["days"] = 3] = "days";
    VIEW[VIEW["statistics"] = 4] = "statistics";
})(VIEW || (exports.VIEW = VIEW = {}));
;
var VIEW_NAME;
(function (VIEW_NAME) {
    VIEW_NAME["map"] = "map";
    VIEW_NAME["chart"] = "chart";
    VIEW_NAME["days"] = "days";
    VIEW_NAME["statistics"] = "statistics";
})(VIEW_NAME || (exports.VIEW_NAME = VIEW_NAME = {}));
;
var EXPORT_TYPE;
(function (EXPORT_TYPE) {
    EXPORT_TYPE["csv"] = "csv";
    EXPORT_TYPE["json"] = "json";
    EXPORT_TYPE["xml"] = "xml";
    EXPORT_TYPE["txt"] = "txt";
})(EXPORT_TYPE || (exports.EXPORT_TYPE = EXPORT_TYPE = {}));
;
//# sourceMappingURL=enums.js.map