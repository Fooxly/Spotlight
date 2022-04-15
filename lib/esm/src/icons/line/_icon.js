import { useTheme } from 'styled-components';
export function $icon(props, color = 'gray1', size = 25) {
    const colorFunc = useTheme().color;
    return [
        color === '' ? undefined : colorFunc(props.color ?? color),
        typeof props.size === 'string' ? Number.parseInt(props.size) : props.size ?? size,
    ];
}
