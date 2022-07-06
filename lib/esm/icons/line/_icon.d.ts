interface IconPropsBase {
    color: string;
    size: number | string;
    className?: string;
}
declare type IconProp = keyof IconPropsBase;
export declare type IconProps<NotRequired extends IconProp | undefined = undefined> = NotRequired extends IconProp ? Omit<IconPropsBase, NotRequired> & Partial<Pick<IconPropsBase, NotRequired>> : IconPropsBase;
export declare function $icon<NotRequired extends IconProp>(props: IconProps<NotRequired>, color?: string | '', size?: number): [string | undefined, number];
export {};