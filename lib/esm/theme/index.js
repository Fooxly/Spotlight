import { base } from './base';
import { dark } from './dark';
var light = base;
export var themes = { light: light, dark: dark };
export { getColorFunction } from './base/color';
export * from './app';
