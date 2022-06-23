"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shell = exports.pickColor = exports.question = exports.toast = exports.registerCommand = exports.registerPage = exports.unregister = exports.Spotlight = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const styled_components_1 = require("styled-components");
const utils_1 = require("./utils");
const components_1 = require("./components");
const theme_1 = require("./theme");
function Spotlight({ isDarkMode, showRecentlyUsed = 5, showTips = true }) {
    (0, react_1.useEffect)(() => {
        localStorage.setItem(utils_1.HISTORY_LENGTH_KEY, showRecentlyUsed.toString());
    }, [showRecentlyUsed]);
    const calculatedTheme = (0, react_1.useMemo)(() => {
        const selectedTheme = theme_1.themes[isDarkMode ? 'dark' : 'light'];
        return Object.assign(Object.assign({}, selectedTheme), { color: (0, theme_1.getColorFunction)(Object.assign({}, selectedTheme.color.colors)) });
    }, [isDarkMode]);
    return ((0, jsx_runtime_1.jsxs)(styled_components_1.ThemeProvider, Object.assign({ theme: calculatedTheme }, { children: [(0, jsx_runtime_1.jsx)(components_1.SpotlightComponent, { showTips: showTips }), (0, jsx_runtime_1.jsx)(components_1.ColorPicker, {}), (0, jsx_runtime_1.jsx)(components_1.Toast, {})] })));
}
exports.Spotlight = Spotlight;
function unregister(title) {
    const commandIndex = utils_1.COMMANDS.findIndex((command) => command.title === title);
    if (commandIndex !== -1) {
        utils_1.COMMANDS.splice(commandIndex, 1);
    }
    const pagesIndex = utils_1.PAGES.findIndex((page) => page.title === title);
    if (pagesIndex !== -1) {
        utils_1.PAGES.splice(pagesIndex, 1);
    }
}
exports.unregister = unregister;
function registerPage(title, page, options) {
    const oldIndex = utils_1.PAGES.findIndex(({ title: oldTitle }) => oldTitle === title);
    if (oldIndex > -1)
        utils_1.PAGES.splice(oldIndex, 1);
    const oldCommandIndex = utils_1.COMMANDS.findIndex(({ title: oldTitle }) => oldTitle === title);
    if (oldCommandIndex > -1)
        utils_1.COMMANDS.splice(oldCommandIndex, 1);
    utils_1.PAGES.push({
        title,
        page,
        type: 'jump-to',
        options: Object.assign({ icon: 'redirect' }, options),
    });
    return () => unregister(title);
}
exports.registerPage = registerPage;
function registerCommand(title, action, options) {
    const oldIndex = utils_1.COMMANDS.findIndex(({ title: oldTitle }) => oldTitle === title);
    if (oldIndex > -1)
        utils_1.COMMANDS.splice(oldIndex, 1);
    const oldPageIndex = utils_1.PAGES.findIndex(({ title: oldTitle }) => oldTitle === title);
    if (oldPageIndex > -1)
        utils_1.PAGES.splice(oldPageIndex, 1);
    utils_1.COMMANDS.push({
        title,
        action,
        type: 'command',
        options,
    });
    return () => unregister(title);
}
exports.registerCommand = registerCommand;
function toast(message) {
    const handleRequest = (ev) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.removeEventListener(utils_1.TOAST_EVENT_KEY, handleRequest);
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    document.addEventListener(utils_1.TOAST_EVENT_KEY, handleRequest);
    const ev = new CustomEvent(utils_1.TOAST_EVENT_KEY, {
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
exports.toast = toast;
function question(question, answers) {
    return new Promise((resolve) => {
        const handleRequest = (ev) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(utils_1.TEXT_INPUT_RESULT_EVENT_KEY, handleRequest);
            resolve(ev.detail.value);
        };
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(utils_1.TEXT_INPUT_RESULT_EVENT_KEY, handleRequest);
        const ev = new CustomEvent(utils_1.INPUT_TYPE_EVENT_KEY, {
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
exports.question = question;
function pickColor(options) {
    const baseOptions = {
        modes: utils_1.ALL_COLOR_MODES,
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
            document.removeEventListener(utils_1.COLOR_PICKER_RESULT_EVENT_KEY, handleRequest);
        };
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(utils_1.COLOR_PICKER_RESULT_EVENT_KEY, handleRequest);
        const ev = new CustomEvent(utils_1.COLOR_PICKER_EVENT_KEY, {
            bubbles: false,
            detail: Object.assign(Object.assign({}, baseOptions), options),
        });
        // Add a small timeout to wait for possible rerenders inside the spotlight
        setTimeout(() => {
            document.dispatchEvent(ev);
        }, 10);
    });
}
exports.pickColor = pickColor;
/* eslint-disable @typescript-eslint/no-throw-literal */
function shell(command, options) {
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
exports.shell = shell;
exports.default = {
    Spotlight,
    registerPage,
    registerCommand,
    unregister,
    question,
    shell,
    toast,
    pickColor,
};
