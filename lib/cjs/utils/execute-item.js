"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeItem = void 0;
const history_1 = require("./history");
function executeItem(item, param) {
    var _a;
    if (((_a = item.options) === null || _a === void 0 ? void 0 : _a.warnBeforeUse) &&
        !confirm(typeof item.options.warnBeforeUse === 'string'
            ? item.options.warnBeforeUse
            : 'Are you sure you want to continue? This could have major consequences.'))
        return;
    (0, history_1.updateHistory)(item);
    if (item.type === 'command') {
        return item.action(param);
    }
    else {
        window.location.href = item.page;
    }
}
exports.executeItem = executeItem;
