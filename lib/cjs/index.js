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
exports.shell = exports.question = exports.unregister = exports.registerCommand = exports.registerJumpTo = exports.Spotlight = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const styled_components_1 = require("styled-components");
const utils_1 = require("./utils");
const spotlight_1 = require("./spotlight");
const theme_1 = require("./theme");
function Spotlight({ isDarkMode, showRecentlyUsed = 5 }) {
    (0, react_1.useEffect)(() => {
        localStorage.setItem(utils_1.HISTORY_LENGTH_KEY, showRecentlyUsed.toString());
    }, [showRecentlyUsed]);
    const calculatedTheme = (0, react_1.useMemo)(() => {
        const selectedTheme = theme_1.themes[isDarkMode ? 'dark' : 'light'];
        return Object.assign(Object.assign({}, selectedTheme), { color: (0, theme_1.getColorFunction)(Object.assign({}, selectedTheme.color.colors)) });
    }, [isDarkMode]);
    return ((0, jsx_runtime_1.jsx)(styled_components_1.ThemeProvider, Object.assign({ theme: calculatedTheme }, { children: (0, jsx_runtime_1.jsx)(spotlight_1.SpotlightComponent, {}) })));
}
exports.Spotlight = Spotlight;
function registerJumpTo(title, page, options) {
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
}
exports.registerJumpTo = registerJumpTo;
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
}
exports.registerCommand = registerCommand;
function unregister(title) {
    utils_1.COMMANDS.splice(utils_1.COMMANDS.findIndex((command) => command.title === title), 1);
    utils_1.PAGES.splice(utils_1.PAGES.findIndex((page) => page.title === title), 1);
}
exports.unregister = unregister;
function question(question, answers) {
    return new Promise((resolve) => {
        const handleInputRequest = (ev) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(utils_1.TEXT_INPUT_RESULT_EVENT_KEY, handleInputRequest);
            resolve(ev.detail.value);
        };
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(utils_1.TEXT_INPUT_RESULT_EVENT_KEY, handleInputRequest);
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
    registerJumpTo,
    registerCommand,
    unregister,
    question,
    shell,
};
