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
import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
import { SpotlightComponent } from './components';
import { getColorFunction, themes } from './theme';
import { COMMANDS, uuid } from './utils';
export function Spotlight(_a) {
    var isDarkMode = _a.isDarkMode;
    var calculatedTheme = useMemo(function () {
        var selectedTheme = themes[isDarkMode ? 'dark' : 'light'];
        return __assign(__assign({}, selectedTheme), { color: getColorFunction(__assign({}, selectedTheme.color.colors)) });
    }, [isDarkMode]);
    return (_jsx("div", __assign({ id: 'dev-toolkit' }, { children: _jsx(ThemeProvider, __assign({ theme: calculatedTheme }, { children: _jsx(SpotlightComponent, {}) })) })));
}
export function RegisterJumpTo(title, page, options) {
    var id = uuid();
    COMMANDS.push({
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
export function RegisterCommand(title, action, options) {
    var id = uuid();
    COMMANDS.push({
        id: id,
        title: title,
        action: action,
        type: 'command',
        options: options,
    });
    return id;
}
export function Unregister(id) {
    COMMANDS.splice(COMMANDS.findIndex(function (command) { return command.id === id; }), 1);
}
export default {
    Spotlight: Spotlight,
    RegisterJumpTo: RegisterJumpTo,
    RegisterCommand: RegisterCommand,
    Unregister: Unregister,
};
