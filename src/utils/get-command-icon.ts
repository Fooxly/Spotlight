import type { ItemIcon } from 'types';

import {
    BellMuteIcon,
    BellIcon,
    BrushIcon,
    CameraIcon,
    ClockIcon,
    DownloadIcon,
    GearIcon,
    GlobeIcon,
    HouseIcon,
    LinkIcon,
    LockIcon,
    PinIcon,
    PlusCircleIcon,
    RedirectIcon,
    RedoIcon,
    ShieldIcon,
    SunIcon,
    TrashIcon,
    UndoIcon,
    UnlockIcon,
    UploadIcon,
    WandIcon,
} from '@/icons/line';
import { IconProps } from '@/icons/line/_icon';

export function getCommandIcon (icon: ItemIcon): ((props: IconProps) => JSX.Element) {
    switch (icon) {
        case 'bell-mute': return BellMuteIcon;
        case 'bell': return BellIcon;
        case 'brush': return BrushIcon;
        case 'camera': return CameraIcon;
        case 'clock': return ClockIcon;
        case 'download': return DownloadIcon;
        case 'gear': return GearIcon;
        case 'globe': return GlobeIcon;
        case 'house': return HouseIcon;
        case 'link': return LinkIcon;
        case 'lock': return LockIcon;
        case 'pin': return PinIcon;
        case 'plus': return PlusCircleIcon;
        case 'redirect': return RedirectIcon;
        case 'redo': return RedoIcon;
        case 'shield': return ShieldIcon;
        case 'sun': return SunIcon;
        case 'trash': return TrashIcon;
        case 'undo': return UndoIcon;
        case 'unlock': return UnlockIcon;
        case 'upload': return UploadIcon;
        case 'wand': return WandIcon;
    }
}
