import { setup } from './renderers/r17';
import { generateConfig, setAppearance } from './entry';

import * as commands from '@/commands';

// named exports
export * from '@/commands';
export { setAppearance } from './entry';
export const config = generateConfig(setup);

// default export
export default { ...commands, setAppearance, config };
