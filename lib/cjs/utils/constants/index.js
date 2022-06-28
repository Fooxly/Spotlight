"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALL_COLOR_MODES = exports.COLOR_PICKER_RESULT_EVENT_KEY = exports.COLOR_PICKER_EVENT_KEY = exports.TEXT_INPUT_RESULT_EVENT_KEY = exports.INPUT_TYPE_EVENT_KEY = exports.UPDATE_SPOTLIGHT_EVENT_KEY = exports.TOAST_EVENT_KEY = exports.THEME_UPDATE_EVENT_KEY = exports.HISTORY_LENGTH_KEY = exports.HISTORY_KEY = void 0;
__exportStar(require("./base-commands"), exports);
__exportStar(require("./commands"), exports);
__exportStar(require("./errors"), exports);
exports.HISTORY_KEY = '__fooxly_spotlight_history__';
exports.HISTORY_LENGTH_KEY = '__fooxly_spotlight_history_length__';
exports.THEME_UPDATE_EVENT_KEY = '__fooxly_spotlight_theme_update__';
exports.TOAST_EVENT_KEY = '__fooxly_spotlight_toast_message__';
exports.UPDATE_SPOTLIGHT_EVENT_KEY = 'spotlight_force_update';
exports.INPUT_TYPE_EVENT_KEY = 'spotlight_input_type';
exports.TEXT_INPUT_RESULT_EVENT_KEY = 'spotlight_text_input_result';
exports.COLOR_PICKER_EVENT_KEY = 'spotlight_color_picker';
exports.COLOR_PICKER_RESULT_EVENT_KEY = 'spotlight_color_picker_result';
exports.ALL_COLOR_MODES = ['hex', 'rgba', 'hsla'];
