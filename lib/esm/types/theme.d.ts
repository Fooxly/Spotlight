import { ThemeProps as ThemePropsBase } from 'styled-components';
import { base } from '../theme/base';
export declare type Theme = typeof base;
export declare type ThemeProps = ThemePropsBase<Theme>;
export declare type Appearance = 'light' | 'dark' | 'auto';
export declare type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
export declare type JustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';
export { type FontFamily, type TextAlign, type FontWeight } from '../theme/base/text';
export { type Color, type CSSColor, type HexColor } from '../theme/base/color';
/**
 * Extend theme into styled-components props
 */
declare module 'styled-components' {
    interface DefaultTheme extends Theme {
    }
}
