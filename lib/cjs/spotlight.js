"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unregister = exports.RegisterCommand = exports.RegisterJumpTo = exports.Spotlight = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var components_1 = require("./components");
var theme_1 = require("./theme");
var utils_1 = require("./utils");
function Spotlight(_a) {
    var isDarkMode = _a.isDarkMode;
    var calculatedTheme = (0, react_1.useMemo)(function () {
        var selectedTheme = theme_1.themes[isDarkMode ? 'dark' : 'light'];
        return __assign(__assign({}, selectedTheme), { color: (0, theme_1.getColorFunction)(__assign({}, selectedTheme.color.colors)) });
    }, [isDarkMode]);
    return ((0, jsx_runtime_1.jsx)("div", __assign({ id: 'dev-toolkit' }, { children: (0, jsx_runtime_1.jsx)(styled_components_1.ThemeProvider, __assign({ theme: calculatedTheme }, { children: (0, jsx_runtime_1.jsx)(components_1.SpotlightComponent, {}) })) })));
}
exports.Spotlight = Spotlight;
function RegisterJumpTo(title, page, options) {
    var id = (0, utils_1.uuid)();
    utils_1.COMMANDS.push({
        id: id,
        title: title,
        action: function () {
            // TODO: check if this link is external
            if (page.startsWith('/')) {
                window.location.href = "".concat(window.location.origin).concat(page);
            }
            else {
                window.location.href = page;
            }
        },
        type: 'jump-to',
        options: __assign({ icon: 'redirect' }, options)
    });
    return id;
}
exports.RegisterJumpTo = RegisterJumpTo;
function RegisterCommand(title, action, options) {
    var id = (0, utils_1.uuid)();
    utils_1.COMMANDS.push({
        id: id,
        title: title,
        action: action,
        type: 'command',
        options: options,
    });
    return id;
}
exports.RegisterCommand = RegisterCommand;
function Unregister(id) {
    utils_1.COMMANDS.splice(utils_1.COMMANDS.findIndex(function (command) { return command.id === id; }), 1);
}
exports.Unregister = Unregister;
exports.default = {
    Spotlight: Spotlight,
    RegisterJumpTo: RegisterJumpTo,
    RegisterCommand: RegisterCommand,
    Unregister: Unregister,
};
