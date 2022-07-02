import { BellMuteIcon, BellIcon, BranchIcon, BrushIcon, CameraIcon, CheckmarkIcon, ClockIcon, DiceIcon, DownloadIcon, EyedropperIcon, GearIcon, GlobeIcon, HouseIcon, LinkIcon, LockIcon, PinIcon, PlusCircleIcon, RedirectIcon, RedoIcon, ShieldIcon, SunIcon, TrashIcon, UndoIcon, UnlockIcon, UploadIcon, WandIcon, WarningIcon, } from '../icons/line';
export function getLocalIcon(icon) {
    switch (icon) {
        case 'bell-mute': return BellMuteIcon;
        case 'bell': return BellIcon;
        case 'branch': return BranchIcon;
        case 'brush': return BrushIcon;
        case 'camera': return CameraIcon;
        case 'checkmark': return CheckmarkIcon;
        case 'clock': return ClockIcon;
        case 'dice': return DiceIcon;
        case 'download': return DownloadIcon;
        case 'eyedropper': return EyedropperIcon;
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
        case 'warning': return WarningIcon;
        default: return undefined;
    }
}
