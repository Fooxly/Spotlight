import { base } from '../base';
import { color } from './color';
import { shadow } from './shadow';

export const dark = {
    ...base,
    light: false,
    color,
    shadow,
};
