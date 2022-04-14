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
function row({ reverse = false, align = 'center', fullWidth = true, ...props } = {}) {
    return getFlexCss(reverse ? 'row-reverse' : 'row', { align, fullWidth, ...props });
}
function column({ reverse = false, ...props } = {}) {
    return getFlexCss(reverse ? 'column-reverse' : 'column', props);
}
export const flex = { row, col: column };
