import { ColorMode } from '../../types';
export * from './base-commands';
export * from './commands';
export * from './errors';
export declare const HISTORY_KEY = "__fooxly_spotlight_history__";
export declare const HISTORY_LENGTH_KEY = "__fooxly_spotlight_history_length__";
export declare const THEME_UPDATE_EVENT_KEY = "__fooxly_spotlight_theme_update__";
export declare const TOAST_EVENT_KEY = "__fooxly_spotlight_toast_message__";
export declare const UPDATE_SPOTLIGHT_EVENT_KEY = "spotlight_force_update";
export declare const INPUT_TYPE_EVENT_KEY = "spotlight_input_type";
export declare const TEXT_INPUT_RESULT_EVENT_KEY = "spotlight_text_input_result";
export declare const COLOR_PICKER_EVENT_KEY = "spotlight_color_picker";
export declare const COLOR_PICKER_RESULT_EVENT_KEY = "spotlight_color_picker_result";
export declare const ALL_COLOR_MODES: ColorMode[];
