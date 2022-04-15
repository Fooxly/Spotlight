import { useTheme } from 'styled-components';
import type { Color, Theme } from 'types/theme';

interface IconPropsBase {
    color: Color;
    size: number | string;
    className?: string;
}

type IconProp = keyof IconPropsBase;

export type IconProps <NotRequired extends IconProp | undefined = undefined> = NotRequired extends IconProp
    ? Omit<IconPropsBase, NotRequired> & Partial<Pick<IconPropsBase, NotRequired>>
    : IconPropsBase;

export function $icon<NotRequired extends IconProp> (
    props: IconProps<NotRequired>,
    color: Color | '' = 'gray1',
    size = 25,
): [string | undefined, number] {
    const colorFunc = (useTheme() as Theme).color;

    return [
        color === '' ? undefined : colorFunc(props.color ?? color),
        typeof props.size === 'string' ? Number.parseInt(props.size) : props.size ?? size,
    ];
}
