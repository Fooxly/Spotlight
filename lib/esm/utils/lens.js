/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
export var lens = function (obj, path) {
    return path.split('.').reduce(function (o, key) { return (o === null || o === void 0 ? void 0 : o[key]) !== undefined ? o[key] : null; }, obj);
};
