import { GlobeIcon, HouseIcon, PlusCircleIcon, RedirectIcon, RedoIcon, ShieldIcon, SunIcon, UndoIcon } from '../icons/line';
export function getCommandIcon(icon) {
    switch (icon) {
        case 'house': return HouseIcon;
        case 'redirect': return RedirectIcon;
        case 'undo': return UndoIcon;
        case 'redo': return RedoIcon;
        case 'globe': return GlobeIcon;
        case 'sun': return SunIcon;
        case 'shield': return ShieldIcon;
        case 'plus': return PlusCircleIcon;
        default: return null;
    }
}
