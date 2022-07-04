export function getResultById(catalog, id) {
    var _a;
    if (!id)
        return undefined;
    for (const item of catalog) {
        if (item.id === id) {
            return item;
        }
        if ((_a = item.children) === null || _a === void 0 ? void 0 : _a.length) {
            const result = getResultById(item.children, id);
            if (result) {
                return result;
            }
        }
    }
    return undefined;
}
export function getResultsByParentId(catalog, parentId) {
    var _a, _b;
    if (!parentId) {
        return catalog;
    }
    // Deep search trough all the results and children props to find an object with the parent id
    for (const item of catalog) {
        if (item.id === parentId) {
            return (_a = item.children) !== null && _a !== void 0 ? _a : [];
        }
        if ((_b = item.children) === null || _b === void 0 ? void 0 : _b.length) {
            const results = getResultsByParentId(item.children, parentId);
            if (results.length > 0) {
                return results;
            }
        }
    }
    return [];
}
