import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { useSearchContext } from '../../../utils';
import { DEV_TIPS, TIPS } from '../../../utils/constants/tips';
const decodeHTML = (html) => {
    const e = document.createElement('div');
    e.innerHTML = html;
    return e.innerHTML;
};
export function SearchTips({ visible: visibleProp = true }) {
    var _a;
    const { visible, devMode, showTips, customTips } = useSearchContext();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const finalTips = useMemo(() => [
        ...customTips,
        ...TIPS,
        ...(devMode ? DEV_TIPS : []),
    ], [customTips, devMode]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const activeTip = useMemo(() => finalTips[Math.floor(Math.random() * finalTips.length)], [finalTips, visible]);
    if (!visibleProp || !showTips)
        return null;
    return (_jsx("p", { className: 'spotlight-search-tips', dangerouslySetInnerHTML: { __html: (_a = decodeHTML(activeTip)) !== null && _a !== void 0 ? _a : '' } }));
}
