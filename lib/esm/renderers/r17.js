import { jsx as _jsx } from "react/jsx-runtime";
import ReactDOM from 'react-dom';
import { getMainComponent } from '../utils';
import { Master } from '../components';
export function Setup(options) {
    const mainComponent = getMainComponent();
    if (!mainComponent) {
        console.error('Spotlight was unable to create a root component.');
        return;
    }
    ReactDOM.render(_jsx(Master, Object.assign({}, options)), mainComponent);
}
