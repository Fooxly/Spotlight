var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
import { COMMANDS, HISTORY_LENGTH_KEY, INPUT_TYPE_EVENT_KEY, PAGES, TEXT_INPUT_RESULT_EVENT_KEY } from './utils';
import { SpotlightComponent } from './spotlight';
import { getColorFunction, themes } from './theme';
export function Spotlight({ isDarkMode, showRecentlyUsed = 5 }) {
    useEffect(() => {
        localStorage.setItem(HISTORY_LENGTH_KEY, showRecentlyUsed.toString());
    }, [showRecentlyUsed]);
    const calculatedTheme = useMemo(() => {
        const selectedTheme = themes[isDarkMode ? 'dark' : 'light'];
        return Object.assign(Object.assign({}, selectedTheme), { color: getColorFunction(Object.assign({}, selectedTheme.color.colors)) });
    }, [isDarkMode]);
    return (_jsx(ThemeProvider, Object.assign({ theme: calculatedTheme }, { children: _jsx(SpotlightComponent, {}) })));
}
export function registerJumpTo(title, page, options) {
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
}
export function unregister(title) {
    COMMANDS.splice(COMMANDS.findIndex((command) => command.title === title), 1);
    PAGES.splice(PAGES.findIndex((page) => page.title === title), 1);
}
export function question(question, answers) {
    return new Promise((resolve) => {
        const handleInputRequest = (ev) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(TEXT_INPUT_RESULT_EVENT_KEY, handleInputRequest);
            resolve(ev.detail.value);
        };
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(TEXT_INPUT_RESULT_EVENT_KEY, handleInputRequest);
        const ev = new CustomEvent(INPUT_TYPE_EVENT_KEY, {
            bubbles: false,
            detail: {
                type: ((answers === null || answers === void 0 ? void 0 : answers.length) ? 'question' : 'input'),
                question,
                answers,
            },
        });
        document.dispatchEvent(ev);
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
    registerJumpTo,
    registerCommand,
    unregister,
    question,
    shell,
};
