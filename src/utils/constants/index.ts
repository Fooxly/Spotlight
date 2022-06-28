import { ColorMode } from '@/types';

export * from './base-commands';
export * from './commands';
export * from './errors';

export const HISTORY_KEY = '__fooxly_spotlight_history__';
export const HISTORY_LENGTH_KEY = '__fooxly_spotlight_history_length__';

export const UPDATE_SPOTLIGHT_EVENT_KEY = 'spotlight_force_update';
export const INPUT_TYPE_EVENT_KEY = 'spotlight_input_type';
export const TEXT_INPUT_RESULT_EVENT_KEY = 'spotlight_text_input_result';
export const TOAST_EVENT_KEY = 'spotlight_toast_message';
export const COLOR_PICKER_EVENT_KEY = 'spotlight_color_picker';
export const COLOR_PICKER_RESULT_EVENT_KEY = 'spotlight_color_picker_result';

export const ALL_COLOR_MODES: ColorMode[] = ['hex', 'rgba', 'hsla'];
