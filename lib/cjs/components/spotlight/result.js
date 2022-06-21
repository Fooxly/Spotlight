"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const styled_components_1 = __importDefault(require("styled-components"));
const get_command_icon_1 = require("../../utils/get-command-icon");
const utils_1 = require("../../utils");
let lastMouseX = 0;
let lastMouseY = 0;
function Result({ hasIcons, result, index, selected, onSoftSelect, onSelect }) {
    const spotlight = (0, utils_1.useSpotlightContext)();
    const enableFocus = () => onSoftSelect(index);
    const icon = (0, react_1.useMemo)(() => {
        var _a;
        if (!((_a = result.item.options) === null || _a === void 0 ? void 0 : _a.icon))
            return null;
        // Check if the icon is within the icon set
        const Icon = (0, get_command_icon_1.getCommandIcon)(result.item.options.icon);
        if (Icon)
            return (0, jsx_runtime_1.jsx)(Icon, { size: 24, color: 'gray4' });
        // Check if the icon is an image url
        let url;
        try {
            url = new URL(result.item.options.icon);
        }
        catch (_b) { }
        /// Display the image
        if ((url === null || url === void 0 ? void 0 : url.protocol) === 'https:' || (url === null || url === void 0 ? void 0 : url.protocol) === 'http:') {
            return (0, jsx_runtime_1.jsx)(ImageIcon, { src: url.href });
        }
        // Display the possible text / emoji
        return (0, jsx_runtime_1.jsx)(TextIcon, { children: result.item.options.icon });
    }, [result]);
    const TypeText = (0, react_1.useMemo)(() => {
        // When a question is shown, the type should always return "Select option"
        if (spotlight.type === 'question')
            return 'Select option';
        if (result.item.type === 'command') {
            // When a question is shown, the type should always return "Select option"
            if (result.item.parentCommand)
                return 'Select option';
            return 'Run command';
        }
        return 'Jump to';
    }, [spotlight, result]);
    const handleAction = () => {
        onSelect(result);
    };
    // Register the mouse movement to check if the mouse has actually moved or the content below has shifted.
    const handleMouseMove = (e) => {
        if (e.clientX === lastMouseX && e.clientY === lastMouseY)
            return;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        enableFocus();
    };
    return (
    // eslint-disable-next-line react/jsx-handler-names
    (0, jsx_runtime_1.jsxs)(Container, Object.assign({ id: `command-${index}`, "$selected": selected, onClick: handleAction, onMouseMove: handleMouseMove, onFocus: enableFocus }, { children: [(0, jsx_runtime_1.jsxs)(Left, { children: [hasIcons && ((0, jsx_runtime_1.jsx)(IconWrapper, { children: icon })), (0, jsx_runtime_1.jsx)(Title, { children: result.item.title })] }), selected && ((0, jsx_runtime_1.jsx)(Type, { children: TypeText }))] })));
}
exports.Result = Result;
const Container = styled_components_1.default.button `
    ${(p) => p.theme.flex.row({ align: 'center' })}
    height: 45px;
    min-height: 45px;
    border-radius: 10px;
    border: 0;
    outline: 0;
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
    margin: 0;
    padding: 0;
    white-space: nowrap;
    overflow: hidden;
    display: block;
    text-overflow: ellipsis;
`;
const Type = styled_components_1.default.p `
    ${(p) => p.theme.text.System.regular(15, 'gray5')}
    animation: ${(p) => p.theme.animation.fadeIn} 0.2s ease-in-out;
    margin: 0;
    padding: 0;
    text-align: right;

    @media(max-width: 450px) {
        display: none;
    }
`;
const TextIcon = styled_components_1.default.p `
    ${(p) => p.theme.text.System.regular(16, 'gray4')}
    width: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
`;
const ImageIcon = styled_components_1.default.img `
    border-radius: 5px;
    width: 24px;
    height: 24px;
`;
