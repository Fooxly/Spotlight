/// <reference types="react" />
import { Appearance } from './colors';
import { Answer } from './search';
import { ToastType } from './toast';
export interface ChangeThemeEvent {
    appearance: Appearance;
}
export interface ToastEvent {
    message: string | JSX.Element;
    type: ToastType;
}
export interface QuestionEvent {
    question: string;
    options?: string[] | Answer[];
}
export interface QuestionResponseEvent {
    value?: string;
}
export interface ResultPickedEvent {
    value?: string;
}
