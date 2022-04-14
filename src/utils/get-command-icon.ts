import { HouseIcon, RedirectIcon, RedoIcon, UndoIcon } from '@/icons/line';
import { IconProps } from '@/icons/line/_icon';
import { ItemIcon } from '@/types';

export function getCommandIcon (icon?: ItemIcon): ((props: IconProps) => JSX.Element) | null {
    switch (icon) {
        case 'house': return HouseIcon;
        case 'redirect': return RedirectIcon;
        case 'undo': return UndoIcon;
        case 'redo': return RedoIcon;
        default: return null;
    }
}
