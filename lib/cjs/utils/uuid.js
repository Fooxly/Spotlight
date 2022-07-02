"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUUID = void 0;
function getUUID() {
    return ([1e7].toString() + `${-1e3}` + `${-4e3}` + `${-8e3}` + `${-1e11}`)
        .replace(/[018]/g, (c) => (Number(c) ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> Number(c) / 4).toString(16));
}
exports.getUUID = getUUID;
