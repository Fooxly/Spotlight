import { Appearance } from './theme';
import { ToastType } from './utils';

export interface ChangeThemeEvent {
    appearance: Appearance;
}

export interface ToastMessageEvent {
    message: string | JSX.Element;
    type: ToastType;
}
