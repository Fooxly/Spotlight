"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = exports.getUUID = void 0;
function getUUID() {
    return ([1e7].toString() + `${-1e3}` + `${-4e3}` + `${-8e3}` + `${-1e11}`)
        .replace(/[018]/g, (c) => (Number(c) ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> Number(c) / 4).toString(16));
}
exports.getUUID = getUUID;
function generateId(title) {
    var _a;
    let hash = 0;
    const len = title.length;
    for (let i = 0; i < len; i++) {
        hash = ((hash << 5) - hash) + ((_a = title.codePointAt(i)) !== null && _a !== void 0 ? _a : 0);
        hash = Math.trunc(hash); // to 32bit integer
    }
    return `${Math.abs(hash)}`;
}
exports.generateId = generateId;
