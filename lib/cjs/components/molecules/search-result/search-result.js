"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchResult = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const utils_1 = require("../../../utils");
require("./styles.css");
let lastMouseX = -1;
let lastMouseY = -1;
function SearchResult({ result }) {
    var _a;
    const { selectedItem, setSelectedItem } = (0, utils_1.useSearchContext)();
    const TypeText = (0, react_1.useMemo)(() => {
        if (result.type === 'option')
            return 'Select option';
        if (result.type === 'command')
            return 'Run command';
        if (result.type === 'page')
            return 'Jump to';
        return '';
    }, [result.type]);
    const Icon = (0, react_1.useMemo)(() => {
        var _a, _b, _c, _d;
        if (!((_c = (_b = (_a = result.icon) === null || _a === void 0 ? void 0 : _a.trim) === null || _b === void 0 ? void 0 : _b.call(_a)) === null || _c === void 0 ? void 0 : _c.length))
            return null;
        // Check if the icon is within the icon set
        const LocalIcon = (0, utils_1.getLocalIcon)(result.icon);
        if (LocalIcon)
            return (0, jsx_runtime_1.jsx)(LocalIcon, { size: 24, color: (_d = result.iconColor) !== null && _d !== void 0 ? _d : 'gray4' });
        // Check if the icon is an image url
        let url;
        try {
            url = new URL(result.icon);
        }
        catch (_e) { }
        /// Display the image
        if ((url === null || url === void 0 ? void 0 : url.protocol) === 'https:' || (url === null || url === void 0 ? void 0 : url.protocol) === 'http:') {
            return (0, jsx_runtime_1.jsx)("img", { src: url.href });
        }
        // Display the possible text / emoji
        return (0, jsx_runtime_1.jsx)("p", { children: result.icon });
    }, [result.icon, result.iconColor]);
    const enableFocus = () => setSelectedItem(result.id);
    const handleMouseMove = (ev) => {
        if (ev.clientX === lastMouseX && ev.clientY === lastMouseY)
            return;
        const updateFocus = (lastMouseX > -1 && lastMouseY > -1);
        lastMouseX = ev.clientX;
        lastMouseY = ev.clientY;
        if (updateFocus)
            enableFocus();
    };
    const handlePickResult = () => {
        const ev = new CustomEvent(utils_1.PICKED_RESULT_EVENT_KEY, {
            bubbles: false,
            detail: {
                value: result.id,
            },
        });
        document.dispatchEvent(ev);
    };
    return ((0, jsx_runtime_1.jsxs)("button", Object.assign({ id: `option-${result.id}`, className: `spotlight-search-result ${selectedItem === result.id ? 'spotlight-search-result-selected' : ''}`.trim(), onMouseMove: handleMouseMove, onClick: handlePickResult, 
        // eslint-disable-next-line react/jsx-handler-names
        onFocus: enableFocus }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'spotlight-search-result-left' }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'spotlight-search-result-icon' }, { children: Icon })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: 'spotlight-search-result-title' }, { children: (_a = result.label) !== null && _a !== void 0 ? _a : result.id }))] })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: 'spotlight-search-result-type' }, { children: TypeText }))] })));
}
exports.SearchResult = SearchResult;
