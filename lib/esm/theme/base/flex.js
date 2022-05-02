var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { css } from 'styled-components';
function getFlexCss(direction, { align = 'flex-start', justify = 'flex-start', grow = 0, shrink = 1, basis = 'auto', fullWidth = false, fullHeight = false, }) {
    return css `
        display: flex;
        flex-direction: ${direction};
        ${align === 'flex-start' ? '' : `align-items: ${align};`}
        ${justify === 'flex-start' ? '' : `justify-content: ${justify};`}
        ${grow === false || grow === 0 ? '' : `flex-grow: ${grow === true ? '1' : grow};`}
        ${shrink === true || shrink === 1 ? '' : `flex-shrink: ${shrink === false ? '0' : shrink};`}
        ${basis === 'auto' ? '' : `flex-basis: ${basis};`}
        ${fullWidth ? 'width: 100%;' : ''}
        ${fullHeight ? 'height: 100%;' : ''}
    `;
}
function row(_a = {}) {
    var { reverse = false, align = 'center', fullWidth = true } = _a, props = __rest(_a, ["reverse", "align", "fullWidth"]);
    return getFlexCss(reverse ? 'row-reverse' : 'row', Object.assign({ align, fullWidth }, props));
}
function column(_a = {}) {
    var { reverse = false } = _a, props = __rest(_a, ["reverse"]);
    return getFlexCss(reverse ? 'column-reverse' : 'column', props);
}
export const flex = { row, col: column };
