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
exports.SEARCH_CLOSED_EVENT_KEY = exports.SEARCH_INPUT_RESULT_EVENT_KEY = exports.QUESTION_RESULT_EVENT_KEY = exports.QUESTION_EVENT_KEY = exports.TOAST_EVENT_KEY = exports.THEME_UPDATE_EVENT_KEY = exports.REGISTRY_UPDATE_EVENT_KEY = exports.SPOTLIGHT_THEME_KEY = exports.HISTORY_LENGTH_KEY = exports.HISTORY_KEY = void 0;
__exportStar(require("./catelog"), exports);
__exportStar(require("./errors"), exports);
__exportStar(require("./icons"), exports);
__exportStar(require("./spotlight-registry"), exports);
exports.HISTORY_KEY = '__fooxly_spotlight_history__';
exports.HISTORY_LENGTH_KEY = '__fooxly_spotlight_history_length__';
exports.SPOTLIGHT_THEME_KEY = '__fooxly_spotlight_theme__';
exports.REGISTRY_UPDATE_EVENT_KEY = '__fooxly_spotlight_registry_update__';
exports.THEME_UPDATE_EVENT_KEY = '__fooxly_spotlight_theme_update__';
exports.TOAST_EVENT_KEY = '__fooxly_spotlight_toast_message__';
exports.QUESTION_EVENT_KEY = '__fooxly_spotlight_question__';
exports.QUESTION_RESULT_EVENT_KEY = '__fooxly_spotlight_question_result__';
exports.SEARCH_INPUT_RESULT_EVENT_KEY = '__fooxly_spotlight_search_result__';
exports.SEARCH_CLOSED_EVENT_KEY = '__fooxly_spotlight_search_closed__';
