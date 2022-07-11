"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResultsByParentId = exports.getResultById = void 0;
const constants_1 = require("./constants");
function getResultById(id, results) {
    var _a;
    const resultsArr = results !== null && results !== void 0 ? results : constants_1.catalog.store;
    if (!id)
        return undefined;
    for (const item of resultsArr) {
        if (item.id === id) {
            return item;
        }
        if ((_a = item.children) === null || _a === void 0 ? void 0 : _a.length) {
            const result = getResultById(id, item.children);
            if (result) {
                return result;
            }
        }
    }
    return undefined;
}
exports.getResultById = getResultById;
function getResultsByParentId(parentId, results) {
    var _a, _b;
    const resultsArr = results !== null && results !== void 0 ? results : constants_1.catalog.items;
    if (!(resultsArr === null || resultsArr === void 0 ? void 0 : resultsArr.length))
        return [];
    if (!parentId) {
        return [...resultsArr];
    }
    // Deep search trough all the results and children props to find an object with the parent id
    for (const item of resultsArr) {
        if (item.id === parentId) {
            return (_a = item.children) !== null && _a !== void 0 ? _a : [];
        }
        if ((_b = item.children) === null || _b === void 0 ? void 0 : _b.length) {
            const results = getResultsByParentId(parentId, item.children);
            if (results.length > 0) {
                return [...results];
            }
        }
    }
    return [];
}
exports.getResultsByParentId = getResultsByParentId;
