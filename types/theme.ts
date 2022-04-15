import { ThemeProps as ThemePropsBase } from 'styled-components';

import { base } from '@/theme/base';

// Theme

export type Theme = typeof base;
export type ThemeProps = ThemePropsBase<Theme>;
export type Appearance = 'light' | 'dark' | 'auto';

// CSS

export type AlignItems =
    'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
export type JustifyContent =
    'flex-start' | 'flex-end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';

export { type FontFamily, type TextAlign, type FontWeight } from '@/theme/base/text';

export { type Color, type CSSColor, type HexColor } from '@/theme/base/color';

/**
 * Extend theme into styled-components props
 */
declare module 'styled-components' {
    export interface DefaultTheme extends Theme {}
}
