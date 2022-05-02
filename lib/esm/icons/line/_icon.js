import { useTheme } from 'styled-components';
export function $icon(props, color = 'gray1', size = 25) {
    var _a, _b;
    const colorFunc = useTheme().color;
    return [
        color === '' ? undefined : colorFunc((_a = props.color) !== null && _a !== void 0 ? _a : color),
        typeof props.size === 'string' ? Number.parseInt(props.size) : (_b = props.size) !== null && _b !== void 0 ? _b : size,
    ];
}
