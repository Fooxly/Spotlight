var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from 'styled-components';
import { getCommandIcon } from '../utils/get-command-icon';
export function Result(_a) {
    var _b;
    var hasIcons = _a.hasIcons, command = _a.command, index = _a.index, selected = _a.selected, onSoftSelect = _a.onSoftSelect, onComplete = _a.onComplete;
    var enableFocus = function () { return onSoftSelect(index); };
    var Icon = getCommandIcon((_b = command.options) === null || _b === void 0 ? void 0 : _b.icon);
    var handleAction = function () {
        command.action();
        onComplete();
    };
    return (_jsxs(Container, __assign({ id: "command-".concat(command.id), "$selected": selected, onClick: handleAction, onMouseMove: enableFocus, onFocus: enableFocus }, { children: [_jsxs(Left, { children: [hasIcons && (_jsx(IconWrapper, { children: !!Icon && _jsx(Icon, { size: 24, color: 'gray4' }) })), _jsx(Title, { children: command.title })] }), selected && (_jsx(Type, { children: command.type === 'command' ? 'Run command' : 'Jump to' }))] })));
}
var Container = styled.button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    ", "\n    height: 45px;\n    min-height: 45px;\n    border-radius: 10px;\n    padding: 0 15px;\n    background-color: transparent;\n    cursor: pointer;\n    overflow: hidden;\n\n    transition: background-color 0.2s ease-in-out;\n    will-change: background-color;\n\n    ", "\n\n    @media(max-width: 600px) {\n        height: 35px;\n    }\n"], ["\n    ", "\n    height: 45px;\n    min-height: 45px;\n    border-radius: 10px;\n    padding: 0 15px;\n    background-color: transparent;\n    cursor: pointer;\n    overflow: hidden;\n\n    transition: background-color 0.2s ease-in-out;\n    will-change: background-color;\n\n    ", "\n\n    @media(max-width: 600px) {\n        height: 35px;\n    }\n"])), function (p) { return p.theme.flex.row({ align: 'center' }); }, function (p) { return p.$selected && "\n        background-color: ".concat(p.theme.color.gray9, ";\n    "); });
var Left = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    ", "\n    flex: 1;\n"], ["\n    ", "\n    flex: 1;\n"])), function (p) { return p.theme.flex.row({ align: 'center' }); });
var IconWrapper = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    ", "\n    width: 24px;\n    height: 24px;\n    margin-right: 15px;\n"], ["\n    ", "\n    width: 24px;\n    height: 24px;\n    margin-right: 15px;\n"])), function (p) { return p.theme.flex.row({ justify: 'center', align: 'center' }); });
var Title = styled.p(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    ", "\n"], ["\n    ", "\n"])), function (p) { return p.theme.text.System.regular(15, 'gray3'); });
var Type = styled.p(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    ", "\n    animation: ", " 0.2s ease-in-out;\n"], ["\n    ", "\n    animation: ", " 0.2s ease-in-out;\n"])), function (p) { return p.theme.text.System.regular(15, 'gray5'); }, function (p) { return p.theme.animation.fadeIn; });
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
