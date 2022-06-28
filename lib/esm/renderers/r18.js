import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from 'react-dom/client';
import { getMainComponent } from '../utils';
import { Master } from '../components';
let root = null;
export function Setup(options) {
    const mainComponent = getMainComponent();
    if (!mainComponent) {
        console.error('Spotlight was unable to create a root component.');
        return;
    }
    if (!root) {
        root = createRoot(mainComponent);
    }
    root.render(_jsx(Master, Object.assign({}, options)));
}
