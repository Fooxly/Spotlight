import { jsx as _jsx } from "react/jsx-runtime";
import ReactDOM from 'react-dom';
import { getMainComponent } from '../utils';
import { Master } from '../components';
export function setup(options) {
    var _a;
    const mainComponent = getMainComponent();
    if (!mainComponent) {
        if (typeof window !== 'undefined') {
            console.error('Spotlight was unable to create a root component.');
            void ((_a = options === null || options === void 0 ? void 0 : options.onLoadFailed) === null || _a === void 0 ? void 0 : _a.call(options, new Error('SPOTLIGHT_NO_ROOT_COMPONENT')));
        }
        return;
    }
    ReactDOM.render(_jsx(Master, Object.assign({}, options)), mainComponent);
}
