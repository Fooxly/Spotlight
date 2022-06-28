/// <reference types="react" />
import { IconProps } from './_icon';
interface Props extends IconProps {
    direction: 'up' | 'down' | 'left' | 'right';
}
export declare function ChevronIcon({ direction, ...props }: Props): JSX.Element;
export {};
