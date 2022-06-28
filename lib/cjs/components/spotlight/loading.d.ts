/// <reference types="react" />
import type { Color } from '../../types';
interface Props {
    size?: number;
    color?: Color;
    thickness?: number;
}
export declare function Loading({ size, color, thickness: rawThickness, }: Props): JSX.Element;
export {};
