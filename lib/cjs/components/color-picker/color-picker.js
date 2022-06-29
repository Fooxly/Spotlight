"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorPicker = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_dom_1 = __importDefault(require("react-dom"));
const styled_components_1 = __importStar(require("styled-components"));
const react_hotkeys_hook_1 = require("react-hotkeys-hook");
const tooltip_1 = require("../tooltip");
const colors_1 = require("../../utils/colors");
const utils_1 = require("../../utils");
const line_1 = require("../../icons/line");
const commands_1 = require("../../commands");
// create the spotlight color picker wrapper if this is not already created
let spotlightColorPickerWrapper = null;
if (typeof window !== 'undefined') {
    spotlightColorPickerWrapper = document.querySelector('#spotlight-colorpicker');
    if (!spotlightColorPickerWrapper) {
        spotlightColorPickerWrapper = document.createElement('div');
        spotlightColorPickerWrapper.id = 'spotlight-colorpicker';
        document.body.append(spotlightColorPickerWrapper);
    }
}
const preventDefault = (e) => {
    e.preventDefault();
    e.stopPropagation();
};
function ColorPicker() {
    const theme = (0, styled_components_1.useTheme)();
    const colorPickerRef = (0, react_1.useRef)(null);
    const colorAreaDimsRef = (0, react_1.useRef)(null);
    // Color picker states
    const [visible, setVisible] = (0, react_1.useState)(false);
    const [areaFocus, setAreaFocus] = (0, react_1.useState)(false);
    const [activeColor, setActiveColor] = (0, react_1.useState)('#FFFFFFFF');
    const [copied, setCopied] = (0, react_1.useState)(false);
    // Color picker settings
    const [colorModes, setColorModes] = (0, react_1.useState)(utils_1.ALL_COLOR_MODES);
    const [activeColorMode, setActiveColorMode] = (0, react_1.useState)('hex');
    const [useAlpha, setUseAlpha] = (0, react_1.useState)(true);
    const [title, setTitle] = (0, react_1.useState)();
    const [showContinue, setShowContinue] = (0, react_1.useState)(false);
    // Current values
    const [hue, setHue] = (0, react_1.useState)(0);
    const [alpha, setAlpha] = (0, react_1.useState)(1);
    const [position, setPosition] = (0, react_1.useState)({ x: 0, y: 0 });
    // Color values based on the states
    const opaqueHex = activeColor.slice(0, 7);
    const HSLString = `hsl(${hue}, 100%, 50%)`;
    const HOTKEY_OPTIONS = (0, react_1.useMemo)(() => ({
        enabled: visible,
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }), [visible]);
    // Reset the state when the color picker is closed for next use
    (0, react_1.useEffect)(() => {
        if (!visible) {
            setColorModes(utils_1.ALL_COLOR_MODES);
            setUseAlpha(true);
            setCopied(false);
            // eslint-disable-next-line unicorn/no-useless-undefined
            setTitle(undefined);
            setShowContinue(false);
        }
    }, [visible]);
    // Register the color picker event listener
    (0, react_1.useEffect)(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.removeEventListener(utils_1.COLOR_PICKER_EVENT_KEY, handleNewColorPicker, false);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(utils_1.COLOR_PICKER_EVENT_KEY, handleNewColorPicker, false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // Handle new incoming color picker events
    const handleNewColorPicker = (ev) => {
        var _a, _b, _c, _d;
        setShowContinue(true);
        setVisible(true);
        setActiveColor('#FFFFFFFF');
        setHue(0);
        setAlpha(1);
        setPosition({ x: 0, y: 0 });
        setColorModes((_a = ev.detail.modes) !== null && _a !== void 0 ? _a : ['hex']);
        setActiveColorMode((_c = (_b = ev.detail.modes) === null || _b === void 0 ? void 0 : _b[0]) !== null && _c !== void 0 ? _c : 'hex');
        setUseAlpha(ev.detail.alpha === undefined ? true : ev.detail.alpha);
        setTitle((_d = ev.detail.title) !== null && _d !== void 0 ? _d : undefined);
    };
    const getRectSize = () => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return {
            width: (_b = (_a = colorAreaDimsRef.current) === null || _a === void 0 ? void 0 : _a.clientWidth) !== null && _b !== void 0 ? _b : 1,
            height: (_d = (_c = colorAreaDimsRef.current) === null || _c === void 0 ? void 0 : _c.clientHeight) !== null && _d !== void 0 ? _d : 1,
            x: (_f = (_e = colorAreaDimsRef.current) === null || _e === void 0 ? void 0 : _e.getBoundingClientRect().x) !== null && _f !== void 0 ? _f : 0,
            y: (_h = (_g = colorAreaDimsRef.current) === null || _g === void 0 ? void 0 : _g.getBoundingClientRect().y) !== null && _h !== void 0 ? _h : 0,
        };
    };
    const moveMarker = (0, react_1.useCallback)((event) => {
        const area = getRectSize();
        let x = event.pageX - area.x;
        let y = event.pageY - area.y;
        x = (x < 0) ? 0 : (x > area.width) ? area.width : x;
        y = (y < 0) ? 0 : (y > area.height) ? area.height : y;
        setPosition({ x, y });
    }, []);
    (0, react_1.useEffect)(() => {
        if (!colorPickerRef.current)
            return;
        if (areaFocus) {
            colorPickerRef.current.addEventListener('mousemove', moveMarker);
        }
        else {
            colorPickerRef.current.removeEventListener('mousemove', moveMarker);
        }
    }, [areaFocus, colorPickerRef, moveMarker]);
    (0, react_1.useEffect)(() => {
        if (!visible)
            return;
        const newHsva = {
            h: hue,
            s: position.x / getRectSize().width * 100,
            v: 100 - (position.y / getRectSize().height * 100),
            a: alpha,
        };
        const newHex = (0, colors_1.RGBAToHex)((0, colors_1.HSVAtoRGBA)(newHsva));
        setActiveColor(newHex);
        setCopied(false);
    }, [visible, hue, alpha, position]);
    const toggleVisible = () => {
        if (visible) {
            hideColorPicker();
            return;
        }
        setVisible((last) => !last);
    };
    const hideColorPicker = () => {
        const ev = new CustomEvent(utils_1.COLOR_PICKER_RESULT_EVENT_KEY, {
            bubbles: false,
            detail: {
                value: undefined,
                error: new Error('COLOR_PICKER_CLOSED'),
            },
        });
        document.dispatchEvent(ev);
        setVisible(false);
    };
    const handleContinue = () => {
        const ev = new CustomEvent(utils_1.COLOR_PICKER_RESULT_EVENT_KEY, {
            bubbles: false,
            detail: {
                value: Object.fromEntries(colorModes.map((curr) => [curr, (0, colors_1.getColorFromHex)(curr, activeColor, useAlpha)])),
            },
        });
        document.dispatchEvent(ev);
        setVisible(false);
    };
    const handleColorModeChange = (ev) => {
        setCopied(false);
        setActiveColorMode(ev.target.value);
    };
    const handleCopy = () => {
        var _a, _b;
        const value = (0, colors_1.getColorStringForMode)(activeColorMode, activeColor, useAlpha);
        if (navigator.clipboard) {
            void ((_b = (_a = navigator.clipboard) === null || _a === void 0 ? void 0 : _a.writeText) === null || _b === void 0 ? void 0 : _b.call(_a, value));
            setCopied(true);
        }
    };
    (0, react_hotkeys_hook_1.useHotkeys)('esc', (e) => {
        preventDefault(e);
        hideColorPicker();
    }, HOTKEY_OPTIONS);
    (0, react_hotkeys_hook_1.useHotkeys)('cmd+shift+j, ctrl+shift+j', (e) => {
        preventDefault(e);
        setShowContinue(false);
        toggleVisible();
    }, {
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }, [visible]);
    (0, react_hotkeys_hook_1.useHotkeys)('enter', (e) => {
        preventDefault(e);
        if (showContinue) {
            handleContinue();
            return;
        }
        if (navigator.clipboard) {
            handleCopy();
            const outgoingColor = (0, colors_1.getColorStringForMode)(activeColorMode, activeColor, useAlpha);
            (0, commands_1.toast)((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["Copied", '\u00A0', (0, jsx_runtime_1.jsx)("span", Object.assign({ style: {
                            borderRadius: '5px',
                            backgroundColor: activeColor,
                            padding: '3px 7px',
                            color: (0, colors_1.HexToLuma)((0, colors_1.combineHexColors)(theme.color.gray10, activeColor)) > 165 ? '#000' : '#fff',
                        } }, { children: outgoingColor })), '\u00A0', "to your clipboard"] }));
        }
        hideColorPicker();
    }, HOTKEY_OPTIONS, [activeColor, showContinue]);
    // If we are unable to find the window element, we can not render
    if (typeof window === 'undefined')
        return null;
    return react_dom_1.default.createPortal(!visible ? null : ((0, jsx_runtime_1.jsxs)(Container, Object.assign({ ref: colorPickerRef, onMouseUp: () => setAreaFocus(false) }, { children: [(0, jsx_runtime_1.jsx)(Background, { onClick: hideColorPicker }), (0, jsx_runtime_1.jsxs)(Content, { children: [!!title && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(Title, { children: title }) })), (0, jsx_runtime_1.jsx)(Picker, Object.assign({ ref: colorAreaDimsRef, onMouseDown: () => setAreaFocus(true), "$hasTitle": !!title, style: {
                            backgroundColor: HSLString,
                            backgroundImage: `linear-gradient(rgba(0,0,0,0), #000), linear-gradient(90deg, #fff, ${HSLString})`,
                        } }, { children: (0, jsx_runtime_1.jsx)(PickerMarker, { style: {
                                backgroundColor: opaqueHex,
                                top: position.y,
                                left: position.x,
                            } }) })), (0, jsx_runtime_1.jsxs)(Settings, { children: [(0, jsx_runtime_1.jsxs)(HueWrapper, { children: [(0, jsx_runtime_1.jsx)(SliderInput, { max: 360, value: hue, onChange: (ev) => setHue(Number(ev.target.value)) }), (0, jsx_runtime_1.jsx)(HueMarker, { style: { backgroundColor: HSLString, left: `${hue / 360 * 100}%` } })] }), useAlpha && ((0, jsx_runtime_1.jsxs)(AlphaWrapper, { children: [(0, jsx_runtime_1.jsx)(SliderInput, { max: 100, value: alpha * 100, onChange: (ev) => setAlpha(Number(ev.target.value) / 100) }), (0, jsx_runtime_1.jsx)(AlphaMarker, Object.assign({ style: { left: `${alpha * 100}%` } }, { children: (0, jsx_runtime_1.jsx)(AlphaMarkerFill, { style: { backgroundColor: activeColor } }) })), (0, jsx_runtime_1.jsx)(AlphaMask, { style: { backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0), ${opaqueHex})` } })] }))] }), (0, jsx_runtime_1.jsxs)(Results, { children: [(0, jsx_runtime_1.jsxs)(ColorResult, { children: [(0, jsx_runtime_1.jsx)(ColorSwash, { style: { backgroundColor: activeColor } }), (0, jsx_runtime_1.jsx)(ColorTextWrapper, Object.assign({ onClick: handleCopy }, { children: navigator.clipboard ? ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, Object.assign({ direction: 'top', content: copied ? 'Copied!' : 'Click to copy!' }, { children: (0, jsx_runtime_1.jsx)(ColorText, { children: (0, colors_1.getColorStringForMode)(activeColorMode, activeColor, useAlpha) }) }))) : ((0, jsx_runtime_1.jsx)(ColorText, { children: (0, colors_1.getColorStringForMode)(activeColorMode, activeColor, useAlpha) })) })), colorModes.length > 1 && ((0, jsx_runtime_1.jsxs)(ColorModeSelector, { children: [(0, jsx_runtime_1.jsx)(ColorModeSelect, Object.assign({ value: activeColorMode, onChange: handleColorModeChange }, { children: colorModes.map((curr) => ((0, jsx_runtime_1.jsx)("option", Object.assign({ value: curr }, { children: curr.toUpperCase() }), curr))) })), (0, jsx_runtime_1.jsx)(line_1.ChevronIcon, { size: 20, color: 'gray1', direction: 'down' })] }))] }), showContinue ? ((0, jsx_runtime_1.jsxs)(Continue, Object.assign({ onClick: handleContinue }, { children: [(0, jsx_runtime_1.jsx)("span", { children: "Continue" }), (0, jsx_runtime_1.jsx)(StyledCheckmarkIcon, { color: 'gray1', size: 16 })] }))) : navigator.clipboard ? ((0, jsx_runtime_1.jsxs)(Continue, Object.assign({ onClick: handleCopy }, { children: [(0, jsx_runtime_1.jsx)("span", { children: copied ? 'Copied!' : 'Copy to clipboard' }), (0, jsx_runtime_1.jsx)(StyledCheckmarkIcon, { color: 'gray1', size: 16 })] }))) : null] })] })] }))), spotlightColorPickerWrapper);
}
exports.ColorPicker = ColorPicker;
const Container = styled_components_1.default.div `
    ${(p) => p.theme.flex.col({ justify: 'center', align: 'center' })}
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 99996;
    transform: translate3d(0, 0, 99996px);
`;
const Background = styled_components_1.default.div `
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 99997;
    background-color: rgba(0, 0, 0, 0.7);
    animation: ${(p) => p.theme.animation.fadeIn} 0.2s ease-in-out;
`;
const Content = styled_components_1.default.div `
    width: 60%;
    max-width: 275px;
    max-height: 90%;
    background-color: ${(p) => p.theme.color.gray10};
    border-radius: 10px;
    border: 2px solid ${(p) => p.theme.light ? p.theme.color.gray4 : p.theme.color.gray8};
    animation: ${(p) => p.theme.animation.fadeInWithPulse} 0.25s ease-in-out;
    z-index: 99998;
    box-sizing: border-box;

    @media(max-width: 900px) {
        width: 70%;
    }

    @media(max-width: 700px) {
        width: 85%;
    }
`;
const Title = styled_components_1.default.p `
    ${(p) => p.theme.text.System.semibold(15, 'gray2')}
    margin: 15px 10px;
    padding: 0;
    user-select: none;
`;
const Picker = styled_components_1.default.div `
    position: relative;
    width: 100%;
    height: 250px;
    cursor: pointer !important;
    will-change: background-color;

    ${(p) => !p.$hasTitle && `
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    `}
`;
const PickerMarker = styled_components_1.default.div `
    display: block;
    box-sizing: border-box;
    pointer-events: none;
    position: absolute;
    width: 12px;
    height: 12px;
    margin: -6px 0 0 -6px;
    border: 1px solid #fff;
    border-radius: 50%;
    cursor: pointer !important;
    will-change: background-color;
`;
const Settings = styled_components_1.default.div `
    user-select: none;
    position: relative;
    width: 100%;
    margin-top: 10px;
    padding: 10px 15px;
    padding-bottom: 0;
    box-sizing: border-box;
`;
const Slider = styled_components_1.default.div `
    user-select: none;
    position: relative;
    width: 100%;
    height: 8px;
    margin-bottom: 20px;
    border-radius: 4px;
`;
const SliderInput = styled_components_1.default.input.attrs({
    type: 'range',
    min: 0,
}) `
    user-select: none;
    position: absolute;
    width: calc(100% + 16px);
    height: 16px;
    left: -8px;
    top: -4px;
    margin: 0;
    cursor: pointer;
    background-color: transparent;
    opacity: 0;
    appearance: none;
    -webkit-appearance: none;
`;
const Marker = styled_components_1.default.div `
    user-select: none;
    position: absolute;
    box-sizing: border-box;
    width: 16px;
    height: 16px;
    top: 0;
    margin: -4px 0 0 -8px;
    border: 2px solid ${(p) => p.theme.color.gray10};
    border-radius: 50%;
    box-shadow: 0 0 2px ${(p) => p.theme.color.gray3};
    pointer-events: none;
    will-change: background-color;
`;
const HueWrapper = (0, styled_components_1.default)(Slider) `
    background-image: linear-gradient(to right, #f00 0%, #ff0 16.66%, #0f0 33.33%, #0ff 50%, #00f 66.66%, #f0f 83.33%, #f00 100%);
`;
const HueMarker = (0, styled_components_1.default)(Marker) ``;
const AlphaWrapper = (0, styled_components_1.default)(Slider) `
    background-image: repeating-linear-gradient(45deg,#aaa 25%,transparent 25%,transparent 75%,#aaa 75%,#aaa), repeating-linear-gradient(45deg,#aaa 25%,#fff 25%,#fff 75%,#aaa 75%,#aaa);
    background-position: 0 0,4px 4px;
    background-size: 8px 8px;
`;
const AlphaMarker = (0, styled_components_1.default)(Marker) `
    background-image: repeating-linear-gradient(45deg,#aaa 25%,transparent 25%,transparent 75%,#aaa 75%,#aaa), repeating-linear-gradient(45deg,#aaa 25%,#fff 25%,#fff 75%,#aaa 75%,#aaa);
    background-position: 0 0,4px 4px;
    background-size: 8px 8px;
`;
const AlphaMarkerFill = styled_components_1.default.div `
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    border-radius: 50%;
`;
const AlphaMask = styled_components_1.default.span `
    width: 100%;
    height: 100%;
    display: block;
    border-radius: inherit;
`;
const Results = styled_components_1.default.div `
    position: relative;
    width: 100%;
    padding: 10px;
    padding-top: 0;
    box-sizing: border-box;
`;
const StyledCheckmarkIcon = (0, styled_components_1.default)(line_1.CheckmarkIcon) `
    display: none;

    @media (max-width: 200px) {
        display: block;
    }
`;
const ColorResult = styled_components_1.default.div `
    ${(p) => p.theme.flex.row({ justify: 'center', align: 'stretch' })}
    width: 100%;
    height: 40px;
    border: 2px solid ${(p) => p.theme.color.gray7};
    border-radius: 8px;
    box-sizing: border-box;
    max-width: 100%;
`;
const ColorSwash = styled_components_1.default.div `
    width: 38px;
    min-width: 38px;
    max-width: 38px;
    height: 36px;
    border-right: 2px solid ${(p) => p.theme.color.gray7};
    user-select: none;
    will-change: background-color;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
`;
const ColorTextWrapper = styled_components_1.default.div `
    ${(p) => p.theme.flex.row({ fullWidth: false, justify: 'center', align: 'center' })}
    box-sizing: border-box;
    width: calc(100% - 80px);
    max-width: calc(100% - 80px);
    height: 100%;
    padding: 0 7px;

    > div {
        width: 100%;
    }
`;
const ColorText = styled_components_1.default.p `
    ${(p) => p.theme.text.System.regular(13, 'gray1', 'center')}
    margin: 0;
    padding: 0;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    line-height: 44px;
`;
const ColorModeSelector = styled_components_1.default.div `
    ${(p) => p.theme.flex.row({ justify: 'center', align: 'center' })}
    position: relative;
    width: 42px;
    min-width: 42px;
    max-width: 42px;
    height: 36px;
    border-left: 2px solid ${(p) => p.theme.color.gray7};
    cursor: pointer;
    user-select: none;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    background-color: transparent;

    transition: background-color 0.2s ease-in-out;
    will-change: background-color;

    :hover {
        background-color: ${(p) => p.theme.color.teal}40;
    }
`;
const ColorModeSelect = styled_components_1.default.select `
    appearance: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    background-color: transparent;
    border: 0;
    outline: 0;
    user-select: none;

    &:focus {
        outline: 0;
    }
`;
const Continue = styled_components_1.default.button `
    ${(p) => p.theme.flex.row({ justify: 'center', align: 'center' })}
    ${(p) => p.theme.text.System.regular(15, 'gray1')}
    border: 2px solid ${(p) => p.theme.color.gray7};
    outline: 0;
    height: 40px;
    border-radius: 8px;
    background-color: transparent;
    overflow: hidden;
    cursor: pointer;
    margin-top: 15px;

    transition: border-color 0.2s ease-in-out, background-color 0.2s ease-in-out;
    will-change: border, color;

    :hover, :focus {
        background-color: ${(p) => p.theme.color.teal}40;
        border: 2px solid ${(p) => p.theme.color.teal};
    }

    > span {
        display: block;

        @media (max-width: 200px) {
            display: none;
        }
    }
`;
