"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommandIcon = void 0;
const line_1 = require("@/icons/line");
function getCommandIcon(icon) {
    switch (icon) {
        case 'house': return line_1.HouseIcon;
        case 'redirect': return line_1.RedirectIcon;
        case 'undo': return line_1.UndoIcon;
        case 'redo': return line_1.RedoIcon;
        case 'globe': return line_1.GlobeIcon;
        case 'sun': return line_1.SunIcon;
        case 'shield': return line_1.ShieldIcon;
        case 'plus': return line_1.PlusCircleIcon;
        default: return null;
    }
}
exports.getCommandIcon = getCommandIcon;
