import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { $icon } from './_icon';
export function TimesIcon(props) {
    const [color, size] = $icon(props);
    return (_jsxs("svg", { width: size, height: size, className: props.className, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', children: [_jsx("path", { d: 'M21 4L4 21', stroke: color, strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }), _jsx("path", { d: 'M4 4L21 21', stroke: color, strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' })] }));
}
