"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommandIcon = void 0;
var line_1 = require("@/icons/line");
function getCommandIcon(icon) {
    switch (icon) {
        case 'house': return line_1.HouseIcon;
        case 'redirect': return line_1.RedirectIcon;
        case 'undo': return line_1.UndoIcon;
        case 'redo': return line_1.RedoIcon;
        default: return null;
    }
}
exports.getCommandIcon = getCommandIcon;
