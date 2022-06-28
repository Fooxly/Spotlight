/// <reference types="react" />
import { Appearance } from './colors';
import { ToastType } from './toast';
export interface ChangeThemeEvent {
    appearance: Appearance;
}
export interface ToastMessageEvent {
    message: string | JSX.Element;
    type: ToastType;
}
