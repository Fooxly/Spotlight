import { HouseIcon, RedirectIcon, RedoIcon, UndoIcon } from '../icons/line';
export function getCommandIcon(icon) {
    switch (icon) {
        case 'house': return HouseIcon;
        case 'redirect': return RedirectIcon;
        case 'undo': return UndoIcon;
        case 'redo': return RedoIcon;
        default: return null;
    }
}
