"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shell = exports.unregister = exports.registerCommand = exports.registerJumpTo = exports.Spotlight = void 0;
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
        return {
            ...selectedTheme,
            color: (0, theme_1.getColorFunction)({ ...selectedTheme.color.colors }),
        };
    }, [isDarkMode]);
    return ((0, jsx_runtime_1.jsx)(styled_components_1.ThemeProvider, { theme: calculatedTheme, children: (0, jsx_runtime_1.jsx)(spotlight_1.SpotlightComponent, {}) }));
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
        options: {
            icon: 'redirect',
            ...options,
        },
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
/* eslint-disable @typescript-eslint/no-throw-literal */
async function shell(command, options) {
    const port = options?.port ?? 1898;
    try {
        const raw = await fetch(`http://localhost:${port}/cmd`, {
            method: 'POST',
            body: JSON.stringify({
                command,
                inTerminal: options?.externalTerminal,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const response = (await raw.json());
        if (!response.success)
            throw { message: 'COMMAND_FAILED', port, reason: response.error };
    }
    catch (error) {
        if (error.message === 'Load failed')
            throw { message: 'SERVER_DOWN', port };
        throw { message: 'UNKNOWN', port, reason: error };
    }
}
exports.shell = shell;
exports.default = {
    Spotlight,
    registerJumpTo,
    registerCommand,
    unregister,
    shell,
};
