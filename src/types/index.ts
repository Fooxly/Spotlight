/**
 * Extend theme into styled-components props
 */
import 'styled-components';
import { Theme as AppTheme } from './theme';

declare module 'styled-components' {
    export interface DefaultTheme extends AppTheme {}
}

export * from './helpers';
export * from './theme';
