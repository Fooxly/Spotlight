/// <reference types="react" />
import { ReactChildren } from '../../types';
interface Props {
    children?: ReactChildren;
    content: string;
    direction: 'top' | 'bottom' | 'left' | 'right';
    delay?: number;
}
export declare function Tooltip({ children, content, direction, delay }: Props): JSX.Element;
export {};
