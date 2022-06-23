var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
import { ALL_COLOR_MODES, COLOR_PICKER_EVENT_KEY, COLOR_PICKER_RESULT_EVENT_KEY, COMMANDS, HISTORY_LENGTH_KEY, INPUT_TYPE_EVENT_KEY, PAGES, TEXT_INPUT_RESULT_EVENT_KEY, TOAST_EVENT_KEY, } from './utils';
import { ColorPicker, SpotlightComponent, Toast } from './components';
import { getColorFunction, themes } from './theme';
export function Spotlight({ isDarkMode, showRecentlyUsed = 5, showTips = true }) {
    useEffect(() => {
        localStorage.setItem(HISTORY_LENGTH_KEY, showRecentlyUsed.toString());
    }, [showRecentlyUsed]);
    const calculatedTheme = useMemo(() => {
        const selectedTheme = themes[isDarkMode ? 'dark' : 'light'];
        return Object.assign(Object.assign({}, selectedTheme), { color: getColorFunction(Object.assign({}, selectedTheme.color.colors)) });
    }, [isDarkMode]);
    return (_jsxs(ThemeProvider, Object.assign({ theme: calculatedTheme }, { children: [_jsx(SpotlightComponent, { showTips: showTips }), _jsx(ColorPicker, {}), _jsx(Toast, {})] })));
}
export function unregister(title) {
    const commandIndex = COMMANDS.findIndex((command) => command.title === title);
    if (commandIndex !== -1) {
        COMMANDS.splice(commandIndex, 1);
    }
    const pagesIndex = PAGES.findIndex((page) => page.title === title);
    if (pagesIndex !== -1) {
        PAGES.splice(pagesIndex, 1);
    }
}
export function registerPage(title, page, options) {
    const oldIndex = PAGES.findIndex(({ title: oldTitle }) => oldTitle === title);
    if (oldIndex > -1)
        PAGES.splice(oldIndex, 1);
    const oldCommandIndex = COMMANDS.findIndex(({ title: oldTitle }) => oldTitle === title);
    if (oldCommandIndex > -1)
        COMMANDS.splice(oldCommandIndex, 1);
    PAGES.push({
        title,
        page,
        type: 'jump-to',
        options: Object.assign({ icon: 'redirect' }, options),
    });
    return () => unregister(title);
}
export function registerCommand(title, action, options) {
    const oldIndex = COMMANDS.findIndex(({ title: oldTitle }) => oldTitle === title);
    if (oldIndex > -1)
        COMMANDS.splice(oldIndex, 1);
    const oldPageIndex = PAGES.findIndex(({ title: oldTitle }) => oldTitle === title);
    if (oldPageIndex > -1)
        PAGES.splice(oldPageIndex, 1);
    COMMANDS.push({
        title,
        action,
        type: 'command',
        options,
    });
    return () => unregister(title);
}
export function toast(message) {
    const handleRequest = (ev) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.removeEventListener(TOAST_EVENT_KEY, handleRequest);
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    document.addEventListener(TOAST_EVENT_KEY, handleRequest);
    const ev = new CustomEvent(TOAST_EVENT_KEY, {
        bubbles: false,
        detail: {
            value: message,
        },
    });
    // Add a small timeout to wait for possible rerenders inside the spotlight
    setTimeout(() => {
        document.dispatchEvent(ev);
    }, 10);
}
export function question(question, answers) {
    return new Promise((resolve) => {
        const handleRequest = (ev) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(TEXT_INPUT_RESULT_EVENT_KEY, handleRequest);
            resolve(ev.detail.value);
        };
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(TEXT_INPUT_RESULT_EVENT_KEY, handleRequest);
        const ev = new CustomEvent(INPUT_TYPE_EVENT_KEY, {
            bubbles: false,
            detail: {
                type: ((answers === null || answers === void 0 ? void 0 : answers.length) ? 'question' : 'input'),
                question,
                answers,
            },
        });
        // Add a small timeout to wait for possible rerenders inside the spotlight
        setTimeout(() => {
            document.dispatchEvent(ev);
        }, 10);
    });
}
export function pickColor(options) {
    const baseOptions = {
        modes: ALL_COLOR_MODES,
        alpha: true,
    };
    return new Promise((resolve, reject) => {
        const handleRequest = (ev) => {
            var _a;
            if (!ev.detail.value || ev.detail.error) {
                reject((_a = ev.detail.error) !== null && _a !== void 0 ? _a : new Error('COLOR_PICK_FAILED'));
                return;
            }
            resolve(ev.detail.value);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(COLOR_PICKER_RESULT_EVENT_KEY, handleRequest);
        };
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(COLOR_PICKER_RESULT_EVENT_KEY, handleRequest);
        const ev = new CustomEvent(COLOR_PICKER_EVENT_KEY, {
            bubbles: false,
            detail: Object.assign(Object.assign({}, baseOptions), options),
        });
        // Add a small timeout to wait for possible rerenders inside the spotlight
        setTimeout(() => {
            document.dispatchEvent(ev);
        }, 10);
    });
}
/* eslint-disable @typescript-eslint/no-throw-literal */
export function shell(command, options) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const port = (_a = options === null || options === void 0 ? void 0 : options.port) !== null && _a !== void 0 ? _a : 1898;
        try {
            const raw = yield fetch(`http://localhost:${port}/cmd`, {
                method: 'POST',
                body: JSON.stringify({
                    command,
                    inTerminal: options === null || options === void 0 ? void 0 : options.externalTerminal,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const response = (yield raw.json());
            if (!response.success)
                throw { message: 'COMMAND_FAILED', port, reason: response.error };
        }
        catch (error) {
            if (error.message === 'Load failed')
                throw { message: 'SERVER_DOWN', port };
            throw { message: 'UNKNOWN', port, reason: error };
        }
    });
}
export default {
    Spotlight,
    registerPage,
    registerCommand,
    unregister,
    question,
    shell,
    toast,
    pickColor,
};
