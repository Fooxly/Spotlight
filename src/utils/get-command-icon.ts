import type { ItemIcon } from 'types';

import { GlobeIcon, HouseIcon, PlusCircleIcon, RedirectIcon, RedoIcon, ShieldIcon, SunIcon, UndoIcon } from '@/icons/line';
import { IconProps } from '@/icons/line/_icon';

export function getCommandIcon (icon?: ItemIcon): ((props: IconProps) => JSX.Element) | null {
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
