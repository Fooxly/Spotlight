import { FlattenSimpleInterpolation } from 'styled-components';
import type { AlignItems, JustifyContent } from '../../types';
export interface FlexProps {
    reverse?: boolean;
    align?: AlignItems;
    justify?: JustifyContent;
    grow?: number | 'initial' | 'inherit' | boolean;
    shrink?: number | 'initial' | 'inherit' | boolean;
    basis?: number | 'auto' | 'initial' | 'inherit';
    fullWidth?: boolean;
    fullHeight?: boolean;
}
declare function row({ reverse, align, fullWidth, ...props }?: FlexProps): FlattenSimpleInterpolation;
declare function column({ reverse, ...props }?: FlexProps): FlattenSimpleInterpolation;
export declare const flex: {
    row: typeof row;
    col: typeof column;
};
export {};
