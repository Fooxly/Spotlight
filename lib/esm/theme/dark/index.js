import { base } from '../base';
import { color } from './color';
import { shadow } from './shadow';
export const dark = Object.assign(Object.assign({}, base), { light: false, color,
    shadow });
