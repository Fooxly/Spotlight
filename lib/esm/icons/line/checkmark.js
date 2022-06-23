import { jsx as _jsx } from "react/jsx-runtime";
import { $icon } from './_icon';
export function CheckmarkIcon(props) {
    const [color, size] = $icon(props);
    return (_jsx("svg", Object.assign({ width: size, height: size, className: props.className, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }, { children: _jsx("path", { d: 'M10.1719 19.249C10.6377 19.249 10.9893 19.0557 11.2441 18.6777L19.5059 5.79297C19.6904 5.51172 19.7607 5.26562 19.7607 5.02832C19.7607 4.42188 19.3389 4 18.7236 4C18.293 4 18.0381 4.14941 17.7744 4.5625L10.1367 16.6914L6.19922 11.6377C5.94434 11.2949 5.68066 11.1543 5.29395 11.1543C4.67871 11.1543 4.23047 11.5938 4.23047 12.2002C4.23047 12.4639 4.32715 12.7188 4.54688 12.9912L9.09961 18.6865C9.40723 19.0645 9.73242 19.249 10.1719 19.249Z', fill: color }) })));
}
