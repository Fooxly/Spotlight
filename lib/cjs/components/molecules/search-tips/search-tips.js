"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchTips = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("./styles.css");
const utils_1 = require("../../../utils");
const tips_1 = require("../../../utils/constants/tips");
const decodeHTML = (html) => {
    const e = document.createElement('div');
    e.innerHTML = html;
    return e.innerHTML;
};
function SearchTips({ visible: visibleProp = true }) {
    var _a;
    const { visible, devMode, showTips } = (0, utils_1.useSearchContext)();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const finalTips = (0, react_1.useMemo)(() => [...tips_1.TIPS, ...(devMode ? tips_1.DEV_TIPS : [])], [tips_1.TIPS, tips_1.DEV_TIPS, devMode]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const activeTip = (0, react_1.useMemo)(() => finalTips[Math.floor(Math.random() * finalTips.length)], [finalTips, visible]);
    if (!visibleProp || !showTips)
        return null;
    return ((0, jsx_runtime_1.jsx)("p", { className: 'spotlight-search-tips', dangerouslySetInnerHTML: { __html: (_a = decodeHTML(activeTip)) !== null && _a !== void 0 ? _a : '' } }));
}
exports.SearchTips = SearchTips;
