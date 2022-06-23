"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tooltip = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const styled_components_1 = __importDefault(require("styled-components"));
function Tooltip({ children, content, direction, delay = 0 }) {
    let timeout;
    const [show, setShow] = (0, react_1.useState)(false);
    const handleShowTip = () => {
        timeout = setTimeout(() => {
            setShow(true);
        }, delay || 0);
    };
    const handleHideTip = () => {
        clearInterval(timeout);
        setShow(false);
    };
    return ((0, jsx_runtime_1.jsxs)(Container, Object.assign({ onMouseEnter: handleShowTip, onMouseLeave: handleHideTip }, { children: [children, show && ((0, jsx_runtime_1.jsx)(Tip, Object.assign({ "$direction": direction }, { children: content })))] })));
}
exports.Tooltip = Tooltip;
const Container = styled_components_1.default.div `
    display: inline-block;
    position: relative;
`;
const Tip = styled_components_1.default.div `
    ${(p) => p.theme.text.System.regular(14, '#fff')}
    position: absolute;
    border-radius: 4px;
    left: 50%;
    transform: translateX(-50%);
    padding: 6px;
    background: #000;
    line-height: 1;
    z-index: 100;
    white-space: nowrap;

    :before {
        content: " ";
        left: 50%;
        border: solid transparent;
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        border-width: 6px;
        margin-left: -6px;
    }

    ${(p) => p.$direction === 'top' && `
        top: -30px;

        :before {
            top: 100%;
            border-top-color: #000;
        }
    `}

    ${(p) => p.$direction === 'right' && `
        left: calc(100% + 30px);
        top: 50%;
        transform: translateX(0) translateY(-50%);

        :before {
            left: -6px;
            top: 50%;
            transform: translateX(0) translateY(-50%);
            border-right-color: #000;
        }
    `}

    ${(p) => p.$direction === 'bottom' && `
        bottom: -30px;

        :before {
            bottom: 100%;
            border-bottom-color: #000;
        }
    `}

    ${(p) => p.$direction === 'left' && `
        left: auto;
        right: calc(100% + 30px);
        top: 50%;
        transform: translateX(0) translateY(-50%);

        :before {
            left: auto;
            right: -12px;
            top: 50%;
            transform: translateX(0) translateY(-50%);
            border-left-color: #000;
        }
    `}
`;
