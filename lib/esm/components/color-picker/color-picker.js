import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { useHotkeys } from 'react-hotkeys-hook';
import { Tooltip } from '../tooltip';
import { getColorFromHex, getColorStringForMode, HSVAtoRGBA, RGBAToHex } from '../../utils/colors';
import { ALL_COLOR_MODES, COLOR_PICKER_EVENT_KEY, COLOR_PICKER_RESULT_EVENT_KEY } from '../../utils';
import { CheckmarkIcon, ChevronIcon } from '../../icons/line';
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
export function ColorPicker() {
    const colorPickerRef = useRef(null);
    const colorAreaDimsRef = useRef(null);
    // Color picker states
    const [visible, setVisible] = useState(false);
    const [areaFocus, setAreaFocus] = useState(false);
    const [activeColor, setActiveColor] = useState('#FFFFFFFF');
    const [copied, setCopied] = useState(false);
    // Color picker settings
    const [colorModes, setColorModes] = useState(ALL_COLOR_MODES);
    const [activeColorMode, setActiveColorMode] = useState('hex');
    const [useAlpha, setUseAlpha] = useState(true);
    const [showContinue, setShowContinue] = useState(false);
    // Current values
    const [hue, setHue] = useState(0);
    const [alpha, setAlpha] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    // Color values based on the states
    const opaqueHex = activeColor.slice(0, 7);
    const HSLString = `hsl(${hue}, 100%, 50%)`;
    const HOTKEY_OPTIONS = useMemo(() => ({
        enabled: visible,
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }), [visible]);
    // Reset the state when the color picker is closed for next use
    useEffect(() => {
        if (!visible) {
            setActiveColor('#FFFFFFFF');
            setHue(0);
            setAlpha(1);
            setPosition({ x: 0, y: 0 });
            setColorModes(ALL_COLOR_MODES);
            setUseAlpha(true);
            setCopied(false);
            setShowContinue(false);
        }
    }, [visible]);
    // Register the color picker event listener
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.removeEventListener(COLOR_PICKER_EVENT_KEY, handleNewColorPicker, false);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(COLOR_PICKER_EVENT_KEY, handleNewColorPicker, false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // Handle new incoming color picker events
    const handleNewColorPicker = (ev) => {
        var _a, _b, _c;
        setShowContinue(true);
        setVisible(true);
        setColorModes((_a = ev.detail.modes) !== null && _a !== void 0 ? _a : ['hex']);
        setActiveColorMode((_c = (_b = ev.detail.modes) === null || _b === void 0 ? void 0 : _b[0]) !== null && _c !== void 0 ? _c : 'hex');
        setUseAlpha(ev.detail.alpha === undefined ? true : ev.detail.alpha);
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
    const moveMarker = useCallback((event) => {
        const area = getRectSize();
        let x = event.pageX - area.x;
        let y = event.pageY - area.y;
        x = (x < 0) ? 0 : (x > area.width) ? area.width : x;
        y = (y < 0) ? 0 : (y > area.height) ? area.height : y;
        setPosition({ x, y });
    }, []);
    useEffect(() => {
        if (!colorPickerRef.current)
            return;
        if (areaFocus) {
            colorPickerRef.current.addEventListener('mousemove', moveMarker);
        }
        else {
            colorPickerRef.current.removeEventListener('mousemove', moveMarker);
        }
    }, [areaFocus, colorPickerRef, moveMarker]);
    useEffect(() => {
        if (!visible)
            return;
        const newHsva = {
            h: hue,
            s: position.x / getRectSize().width * 100,
            v: 100 - (position.y / getRectSize().height * 100),
            a: alpha,
        };
        const newHex = RGBAToHex(HSVAtoRGBA(newHsva));
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
        const ev = new CustomEvent(COLOR_PICKER_RESULT_EVENT_KEY, {
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
        const ev = new CustomEvent(COLOR_PICKER_RESULT_EVENT_KEY, {
            bubbles: false,
            detail: {
                value: Object.fromEntries(colorModes.map((curr) => [curr, getColorFromHex(curr, activeColor, useAlpha)])),
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
        const value = getColorStringForMode(activeColorMode, activeColor, useAlpha);
        if (navigator.clipboard) {
            void ((_b = (_a = navigator.clipboard) === null || _a === void 0 ? void 0 : _a.writeText) === null || _b === void 0 ? void 0 : _b.call(_a, value));
            setCopied(true);
        }
    };
    useHotkeys('esc', (e) => {
        preventDefault(e);
        hideColorPicker();
    }, HOTKEY_OPTIONS);
    useHotkeys('cmd+shift+j, ctrl+shift+j', (e) => {
        preventDefault(e);
        setShowContinue(false);
        toggleVisible();
    }, {
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }, [visible]);
    // If we are not able to find the window element, we can not render
    if (typeof window === 'undefined')
        return null;
    return ReactDOM.createPortal(!visible ? null : (_jsxs(Container, Object.assign({ ref: colorPickerRef, onMouseUp: () => setAreaFocus(false) }, { children: [_jsx(Background, { onClick: hideColorPicker }), _jsxs(Content, { children: [_jsx(Picker, Object.assign({ ref: colorAreaDimsRef, onMouseDown: () => setAreaFocus(true), style: {
                            backgroundColor: HSLString,
                            backgroundImage: `linear-gradient(rgba(0,0,0,0), #000), linear-gradient(90deg, #fff, ${HSLString})`,
                        } }, { children: _jsx(PickerMarker, { style: {
                                backgroundColor: opaqueHex,
                                top: position.y,
                                left: position.x,
                            } }) })), _jsx(Divider, {}), _jsxs(Settings, { children: [_jsxs(HueWrapper, { children: [_jsx(SliderInput, { max: 360, value: hue, onChange: (ev) => setHue(Number(ev.target.value)) }), _jsx(HueMarker, { style: { backgroundColor: HSLString, left: `${hue / 360 * 100}%` } })] }), useAlpha && (_jsxs(AlphaWrapper, { children: [_jsx(SliderInput, { max: 100, value: alpha * 100, onChange: (ev) => setAlpha(Number(ev.target.value) / 100) }), _jsx(AlphaMarker, Object.assign({ style: { left: `${alpha * 100}%` } }, { children: _jsx(AlphaMarkerFill, { style: { backgroundColor: activeColor } }) })), _jsx(AlphaMask, { style: { backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0), ${opaqueHex})` } })] }))] }), _jsxs(Results, { children: [_jsxs(ColorResult, { children: [_jsx(ColorSwash, { style: { backgroundColor: activeColor } }), _jsx(ColorTextWrapper, Object.assign({ onClick: handleCopy }, { children: navigator.clipboard ? (_jsx(Tooltip, Object.assign({ direction: 'top', content: copied ? 'Copied!' : 'Click to copy!' }, { children: _jsx(ColorText, { children: getColorStringForMode(activeColorMode, activeColor, useAlpha) }) }))) : (_jsx(ColorText, { children: getColorStringForMode(activeColorMode, activeColor, useAlpha) })) })), colorModes.length > 1 && (_jsxs(ColorModeSelector, { children: [_jsx(ColorModeSelect, Object.assign({ value: activeColorMode, onChange: handleColorModeChange }, { children: colorModes.map((curr) => (_jsx("option", Object.assign({ value: curr }, { children: curr.toUpperCase() }), curr))) })), _jsx(ChevronIcon, { size: 20, color: 'gray1', direction: 'down' })] }))] }), showContinue ? (_jsxs(Continue, Object.assign({ onClick: handleContinue }, { children: [_jsx("span", { children: "Continue" }), _jsx(StyledCheckmarkIcon, { color: 'gray1', size: 16 })] }))) : navigator.clipboard ? (_jsxs(Continue, Object.assign({ onClick: handleCopy }, { children: [_jsx("span", { children: copied ? 'Copied!' : 'Copy to clipboard' }), _jsx(StyledCheckmarkIcon, { color: 'gray1', size: 16 })] }))) : null] })] })] }))), spotlightColorPickerWrapper);
}
const Container = styled.div `
    ${(p) => p.theme.flex.col({ justify: 'center', align: 'center' })}
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 99996;
    transform: translate3d(0, 0, 99996px);
`;
const Background = styled.div `
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 99997;
    background-color: rgba(0, 0, 0, 0.7);
    animation: ${(p) => p.theme.animation.fadeIn} 0.2s ease-in-out;
`;
const Content = styled.div `
    width: 60%;
    max-width: 275px;
    background-color: ${(p) => p.theme.color.gray10};
    border-radius: 10px;
    border: 2px solid ${(p) => p.theme.light ? p.theme.color.gray4 : p.theme.color.gray8};
    animation: ${(p) => p.theme.animation.fadeInWithPulse} 0.25s ease-in-out;
    z-index: 99998;

    @media(max-width: 900px) {
        width: 70%;
    }

    @media(max-width: 700px) {
        width: 85%;
    }
`;
const Picker = styled.div `
    position: relative;
    width: 100%;
    height: 250px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    cursor: pointer !important;
    will-change: background-color;
`;
const PickerMarker = styled.div `
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
const Divider = styled.div `
    width: 100%;
    height: 1px;
    background-color: ${(p) => p.theme.light ? p.theme.color.gray4 : p.theme.color.gray8};
`;
const Settings = styled.div `
    user-select: none;
    position: relative;
    width: 100%;
    margin-top: 10px;
    padding: 10px 15px;
    padding-bottom: 0;
`;
const Slider = styled.div `
    user-select: none;
    position: relative;
    width: 100%;
    height: 8px;
    margin-bottom: 20px;
    border-radius: 4px;
`;
const SliderInput = styled.input.attrs({
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
const Marker = styled.div `
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
const HueWrapper = styled(Slider) `
    background-image: linear-gradient(to right, #f00 0%, #ff0 16.66%, #0f0 33.33%, #0ff 50%, #00f 66.66%, #f0f 83.33%, #f00 100%);
`;
const HueMarker = styled(Marker) ``;
const AlphaWrapper = styled(Slider) `
    background-image: repeating-linear-gradient(45deg,#aaa 25%,transparent 25%,transparent 75%,#aaa 75%,#aaa), repeating-linear-gradient(45deg,#aaa 25%,#fff 25%,#fff 75%,#aaa 75%,#aaa);
    background-position: 0 0,4px 4px;
    background-size: 8px 8px;
`;
const AlphaMarker = styled(Marker) `
    background-image: repeating-linear-gradient(45deg,#aaa 25%,transparent 25%,transparent 75%,#aaa 75%,#aaa), repeating-linear-gradient(45deg,#aaa 25%,#fff 25%,#fff 75%,#aaa 75%,#aaa);
    background-position: 0 0,4px 4px;
    background-size: 8px 8px;
`;
const AlphaMarkerFill = styled.div `
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    border-radius: 50%;
`;
const AlphaMask = styled.span `
    width: 100%;
    height: 100%;
    display: block;
    border-radius: inherit;
`;
const Results = styled.div `
    position: relative;
    width: 100%;
    padding: 10px;
    padding-top: 0;
`;
const StyledCheckmarkIcon = styled(CheckmarkIcon) `
    display: none;

    @media (max-width: 200px) {
        display: block;
    }
`;
const ColorResult = styled.div `
    ${(p) => p.theme.flex.row({ justify: 'center', align: 'stretch' })}
    width: 100%;
    height: 40px;
    border: 2px solid ${(p) => p.theme.color.gray7};
    border-radius: 8px;
    box-sizing: border-box;
    max-width: 100%;
`;
const ColorSwash = styled.div `
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
const ColorTextWrapper = styled.div `
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
const ColorText = styled.p `
    ${(p) => p.theme.text.System.regular(13, 'gray1', 'center')}
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    line-height: 44px;
`;
const ColorModeSelector = styled.div `
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
const ColorModeSelect = styled.select `
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
const Continue = styled.button `
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
