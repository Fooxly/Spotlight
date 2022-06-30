import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { HexToLuma, RGBAToHex } from '../../utils/colors';
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
export function ColorGrabber({ onGrab, frame, visible = false }) {
    const currentColor = useRef('#000000');
    const cursor = useRef(null);
    const lens = useRef(null);
    const preview = useRef(null);
    const handleCopy = useCallback(() => {
        onGrab === null || onGrab === void 0 ? void 0 : onGrab(currentColor.current);
    }, [onGrab]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleMove = useCallback((e) => {
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
            const hex = RGBAToHex({ r: p[0], g: p[1], b: p[2] }, false);
            preview.current.textContent = hex;
            preview.current.style.backgroundColor = hex;
            preview.current.style.color = HexToLuma(hex) > 165 ? '#000' : '#fff';
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
    return ReactDOM.createPortal(!visible ? null : (_jsxs(Container, { children: [_jsxs(Cursor, Object.assign({ ref: cursor }, { children: [_jsx(LensContainer, { children: _jsx(Lens, { ref: lens }) }), _jsx(ColorPreview, Object.assign({ ref: preview }, { children: "#000000" }))] })), _jsx(MouseArea, { onClick: handleCopy, onMouseMove: handleMove })] })), spotlightColorGrabberWrapper);
}
const Container = styled.div `
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
const Cursor = styled.div `
    ${(p) => p.theme.flex.col({ align: 'center' })}
    position: absolute;
    pointer-events: none;
    transform: translate3d(-${LENS_SIZE / 2}px, -${LENS_SIZE / 2}px, 0);

    will-change: top, left;
    top: 0px;
    left: 0px;
`;
const LensContainer = styled.div `
    width: ${LENS_SIZE}px;
    height: ${LENS_SIZE}px;
    overflow: hidden;
    border-radius: 50%;
    background-color: black;
    box-shadow: 0 0 0 3px white;
`;
const Lens = styled.div `
    width: 100%;
    height: 100%;
    transform: scale(4);
`;
const ColorPreview = styled.div `
    border-radius: 5px;
    border: 2px solid white;
    text-align: center;
    margin-top: 12px;
    padding: 5px;
    width: calc(100% + 4px);
`;
const MouseArea = styled.div `
    width: 100%;
    height: 100%;
`;
