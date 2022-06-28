import { getColor } from '@/utils/appearance';

interface IconPropsBase {
    color: string;
    size: number | string;
    className?: string;
}

type IconProp = keyof IconPropsBase;

export type IconProps <NotRequired extends IconProp | undefined = undefined> = NotRequired extends IconProp
    ? Omit<IconPropsBase, NotRequired> & Partial<Pick<IconPropsBase, NotRequired>>
    : IconPropsBase;

export function $icon<NotRequired extends IconProp> (
    props: IconProps<NotRequired>,
    color: string | '' = 'gray1',
    size = 25,
): [string | undefined, number] {
    return [
        color === '' ? undefined : getColor(props.color ?? color),
        typeof props.size === 'string' ? Number.parseInt(props.size) : props.size ?? size,
    ];
}
