"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalIcon = void 0;
const line_1 = require("../icons/line");
function getLocalIcon(icon) {
    switch (icon) {
        case 'bell-mute': return line_1.BellMuteIcon;
        case 'bell': return line_1.BellIcon;
        case 'branch': return line_1.BranchIcon;
        case 'brush': return line_1.BrushIcon;
        case 'camera': return line_1.CameraIcon;
        case 'checkmark': return line_1.CheckmarkIcon;
        case 'clock': return line_1.ClockIcon;
        case 'dice': return line_1.DiceIcon;
        case 'download': return line_1.DownloadIcon;
        case 'eyedropper': return line_1.EyedropperIcon;
        case 'gear': return line_1.GearIcon;
        case 'globe': return line_1.GlobeIcon;
        case 'house': return line_1.HouseIcon;
        case 'link': return line_1.LinkIcon;
        case 'lock': return line_1.LockIcon;
        case 'pin': return line_1.PinIcon;
        case 'plus': return line_1.PlusCircleIcon;
        case 'redirect': return line_1.RedirectIcon;
        case 'redo': return line_1.RedoIcon;
        case 'shield': return line_1.ShieldIcon;
        case 'sun': return line_1.SunIcon;
        case 'trash': return line_1.TrashIcon;
        case 'undo': return line_1.UndoIcon;
        case 'unlock': return line_1.UnlockIcon;
        case 'upload': return line_1.UploadIcon;
        case 'wand': return line_1.WandIcon;
        case 'warning': return line_1.WarningIcon;
        default: return undefined;
    }
}
exports.getLocalIcon = getLocalIcon;
