"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorGrabber = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_dom_1 = __importDefault(require("react-dom"));
const styled_components_1 = __importDefault(require("styled-components"));
const colors_1 = require("../../utils/colors");
// create the spotlight color picker wrapper if this is not already created
let spotlightColorGrabberWrapper = null;
if (typeof window !== 'undefined') {
    spotlightColorGrabberWrapper = document.querySelector('#spotlight-colorgrabber');
    if (!spotlightColorGrabberWrapper) {
        spotlightColorGrabberWrapper = document.createElement('div');
        spotlightColorGrabberWrapper.id = 'spotlight-colorgrabber';
        document.body.append(spotlightColorGrabberWrapper);
    }
}
const LENS_SIZE = 100;
function ColorGrabber({ onGrab, frame, visible = false }) {
    const currentColor = (0, react_1.useRef)('#000000');
    const cursor = (0, react_1.useRef)(null);
    const lens = (0, react_1.useRef)(null);
    const preview = (0, react_1.useRef)(null);
    const handleCopy = (0, react_1.useCallback)(() => {
        onGrab === null || onGrab === void 0 ? void 0 : onGrab(currentColor.current);
    }, [onGrab]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleMove = (0, react_1.useCallback)((e) => {
        window.requestAnimationFrame(() => {
            const width = document.body.offsetWidth;
            const height = document.body.offsetHeight;
            cursor.current.style.left = `${e.nativeEvent.clientX}px`;
            cursor.current.style.top = `${e.nativeEvent.clientY}px`;
            const lensX = e.pageX - (LENS_SIZE / 2);
            const lensY = e.pageY - (LENS_SIZE / 2);
            lens.current.style.backgroundImage = `url('${frame}')`;
            lens.current.style.backgroundPosition = `-${lensX}px -${lensY}px`;
            lens.current.style.backgroundSize = `${width}px ${height}px`;
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const context = canvas.getContext('2d');
            if (!context)
                return;
            const img = document.createElement('img');
            img.width = width;
            img.height = height;
            img.src = frame;
            context.drawImage(img, 0, 0, width, height);
            const p = context.getImageData(e.pageX, e.pageY, 1, 1).data;
            const hex = (0, colors_1.RGBAToHex)({ r: p[0], g: p[1], b: p[2] }, false);
            preview.current.textContent = hex;
            preview.current.style.backgroundColor = hex;
            preview.current.style.color = (0, colors_1.HexToLuma)(hex) > 165 ? '#000' : '#fff';
            currentColor.current = hex;
            let x = 0;
            let y = 0;
            if (
            // cursor is top left
            (e.nativeEvent.clientY < LENS_SIZE) &&
                (e.nativeEvent.clientX < (LENS_SIZE / 2))) {
                x = preview.current.offsetWidth;
                y = -24;
            }
            else if (
            // cursor is bottom left
            ((window.innerHeight - e.nativeEvent.clientY) < LENS_SIZE) &&
                (e.nativeEvent.clientX < (LENS_SIZE / 2))) {
                x = preview.current.offsetWidth;
                y = -LENS_SIZE - preview.current.offsetHeight;
            }
            else if (
            // cursor is top right
            (e.nativeEvent.clientY < LENS_SIZE) &&
                ((window.innerWidth - e.nativeEvent.clientX) < (LENS_SIZE / 2))) {
                x = -preview.current.offsetWidth;
                y = -24;
            }
            else if (
            // cursor is bottom right
            ((window.innerHeight - e.nativeEvent.clientY) < LENS_SIZE) &&
                ((window.innerWidth - e.nativeEvent.clientX) < (LENS_SIZE / 2))) {
                x = -preview.current.offsetWidth;
                y = -LENS_SIZE - preview.current.offsetHeight;
            }
            else if (
            // cursor is left
            e.nativeEvent.clientX < (LENS_SIZE / 2)) {
                x = preview.current.offsetWidth + 12;
                y = (-LENS_SIZE - preview.current.offsetHeight - 24) / 2;
            }
            else if (
            // cursor is right
            (window.innerWidth - e.nativeEvent.clientX) < (LENS_SIZE / 2)) {
                x = -preview.current.offsetWidth - 12;
                y = (-LENS_SIZE - preview.current.offsetHeight - 24) / 2;
            }
            else if (
            // cursor is bottom
            (window.innerHeight - e.nativeEvent.clientY) < LENS_SIZE) {
                y = -LENS_SIZE - preview.current.offsetHeight - 24;
            }
            preview.current.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
        });
    }, [frame]);
    // If we are unable to find the window element, we can not render
    if (typeof window === 'undefined')
        return null;
    return react_dom_1.default.createPortal(!visible ? null : ((0, jsx_runtime_1.jsxs)(Container, { children: [(0, jsx_runtime_1.jsxs)(Cursor, Object.assign({ ref: cursor }, { children: [(0, jsx_runtime_1.jsx)(LensContainer, { children: (0, jsx_runtime_1.jsx)(Lens, { ref: lens }) }), (0, jsx_runtime_1.jsx)(ColorPreview, Object.assign({ ref: preview }, { children: "#000000" }))] })), (0, jsx_runtime_1.jsx)(MouseArea, { onClick: handleCopy, onMouseMove: handleMove })] })), spotlightColorGrabberWrapper);
}
exports.ColorGrabber = ColorGrabber;
const Container = styled_components_1.default.div `
    ${(p) => p.theme.flex.row({ justify: 'center' })}
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 99997;
    pointer-events: all;
    transform: translate3d(0, 0, 99997px);
`;
const Cursor = styled_components_1.default.div `
    ${(p) => p.theme.flex.col({ align: 'center' })}
    position: absolute;
    pointer-events: none;
    transform: translate3d(-${LENS_SIZE / 2}px, -${LENS_SIZE / 2}px, 0);

    will-change: top, left;
    top: 0px;
    left: 0px;
`;
const LensContainer = styled_components_1.default.div `
    width: ${LENS_SIZE}px;
    height: ${LENS_SIZE}px;
    overflow: hidden;
    border-radius: 50%;
    background-color: black;
    box-shadow: 0 0 0 3px white;
`;
const Lens = styled_components_1.default.div `
    width: 100%;
    height: 100%;
    transform: scale(4);
`;
const ColorPreview = styled_components_1.default.div `
    border-radius: 5px;
    border: 2px solid white;
    text-align: center;
    margin-top: 12px;
    padding: 5px;
    width: calc(100% + 4px);
`;
const MouseArea = styled_components_1.default.div `
    width: 100%;
    height: 100%;
`;
