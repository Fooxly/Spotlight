import { jsx as _jsx } from "react/jsx-runtime";
import { getColor } from '../../../utils/appearance';
import './styles.css';
export function Loading({ size = 25, color, thickness: rawThickness, }) {
    const themeColor = getColor(color !== null && color !== void 0 ? color : 'blue');
    const thickness = rawThickness !== null && rawThickness !== void 0 ? rawThickness : (size / 10);
    const circleStyle = {};
    const rootStyle = {
        width: `${size}px`,
        height: `${size}px`,
        color: themeColor,
    };
    const rootProps = {};
    return (_jsx("span", Object.assign({}, rootProps, { style: rootStyle, role: 'progressbar', className: 'spotlight-loader' }, { children: _jsx("svg", Object.assign({ viewBox: `${size / 2} ${size / 2} ${size} ${size}` }, { children: _jsx("circle", { style: circleStyle, cx: size, cy: size, r: (size - thickness) / 2, fill: 'none', stroke: themeColor, strokeWidth: thickness }) })) })));
}
