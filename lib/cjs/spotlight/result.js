"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const styled_components_1 = __importDefault(require("styled-components"));
const get_command_icon_1 = require("@/utils/get-command-icon");
let lastMouseX = 0;
let lastMouseY = 0;
function Result({ hasIcons, result, index, selected, onSoftSelect, onSelect }) {
    const enableFocus = () => onSoftSelect(index);
    const Icon = result.item.options?.icon ? (0, get_command_icon_1.getCommandIcon)(result.item.options?.icon) : null;
    const TypeText = (0, react_1.useMemo)(() => {
        if (result.item.type === 'command') {
            if (result.item.parentCommand)
                return 'Select option';
            return 'Run command';
        }
        return 'Jump to';
    }, [result]);
    const handleAction = () => {
        onSelect(result);
    };
    const handleMouseMove = (e) => {
        if (e.clientX === lastMouseX && e.clientY === lastMouseY)
            return;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        enableFocus();
    };
    return (
    // eslint-disable-next-line react/jsx-handler-names
    (0, jsx_runtime_1.jsxs)(Container, { id: `command-${index}`, "$selected": selected, onClick: handleAction, onMouseMove: handleMouseMove, onFocus: enableFocus, children: [(0, jsx_runtime_1.jsxs)(Left, { children: [hasIcons && ((0, jsx_runtime_1.jsx)(IconWrapper, { children: !!Icon && (0, jsx_runtime_1.jsx)(Icon, { size: 24, color: 'gray4' }) })), (0, jsx_runtime_1.jsx)(Title, { children: result.item.title })] }), selected && ((0, jsx_runtime_1.jsx)(Type, { children: TypeText }))] }));
}
exports.Result = Result;
const Container = styled_components_1.default.button `
    ${(p) => p.theme.flex.row({ align: 'center' })}
    height: 45px;
    min-height: 45px;
    border-radius: 10px;
    padding: 0 15px;
    background-color: transparent;
    cursor: pointer;
    overflow: hidden;

    transition: background-color 0.2s ease-in-out;
    will-change: background-color;

    ${(p) => p.$selected && `
        background-color: ${p.theme.color.gray9};
    `}

    @media(max-width: 600px) {
        height: 35px;
    }
`;
const Left = styled_components_1.default.div `
    ${(p) => p.theme.flex.row({ align: 'center' })}
    flex: 1;
`;
const IconWrapper = styled_components_1.default.div `
    ${(p) => p.theme.flex.row({ justify: 'center', align: 'center' })}
    width: 24px;
    height: 24px;
    margin-right: 15px;
`;
const Title = styled_components_1.default.p `
    ${(p) => p.theme.text.System.regular(15, 'gray1')}

    white-space: nowrap;
    overflow: hidden;
    display: block;
    text-overflow: ellipsis;
`;
const Type = styled_components_1.default.p `
    ${(p) => p.theme.text.System.regular(15, 'gray5')}
    animation: ${(p) => p.theme.animation.fadeIn} 0.2s ease-in-out;
    text-align: right;

    @media(max-width: 450px) {
        display: none;
    }
`;
