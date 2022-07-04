import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { getLocalIcon, useSearchContext } from '../../../utils';
import './styles.css';
let lastMouseX = -1;
let lastMouseY = -1;
export function SearchResult({ result }) {
    var _a;
    const { selectedItem, setSelectedItem, setParentId } = useSearchContext();
    const TypeText = useMemo(() => {
        if (result.type === 'option')
            return 'Select option';
        if (result.type === 'command')
            return 'Run command';
        if (result.type === 'page')
            return 'Jump to';
        return '';
    }, [result.type]);
    const Icon = useMemo(() => {
        var _a, _b, _c, _d;
        if (!((_c = (_b = (_a = result.icon) === null || _a === void 0 ? void 0 : _a.trim) === null || _b === void 0 ? void 0 : _b.call(_a)) === null || _c === void 0 ? void 0 : _c.length))
            return null;
        // Check if the icon is within the icon set
        const LocalIcon = getLocalIcon(result.icon);
        if (LocalIcon)
            return _jsx(LocalIcon, { size: 24, color: (_d = result.iconColor) !== null && _d !== void 0 ? _d : 'gray4' });
        // Check if the icon is an image url
        let url;
        try {
            url = new URL(result.icon);
        }
        catch (_e) { }
        /// Display the image
        if ((url === null || url === void 0 ? void 0 : url.protocol) === 'https:' || (url === null || url === void 0 ? void 0 : url.protocol) === 'http:') {
            return _jsx("img", { src: url.href });
        }
        // Display the possible text / emoji
        return _jsx("p", { children: result.icon });
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
        var _a;
        if (!((_a = result.children) === null || _a === void 0 ? void 0 : _a.length)) {
            result.action(result);
            return;
        }
        setParentId(result.id);
    };
    return (_jsxs("button", Object.assign({ id: `option-${result.id}`, className: `spotlight-search-result ${selectedItem === result.id ? 'spotlight-search-result-selected' : ''}`.trim(), onMouseMove: handleMouseMove, onClick: handlePickResult, 
        // eslint-disable-next-line react/jsx-handler-names
        onFocus: enableFocus }, { children: [_jsxs("div", Object.assign({ className: 'spotlight-search-result-left' }, { children: [_jsx("div", Object.assign({ className: 'spotlight-search-result-icon' }, { children: Icon })), _jsx("p", Object.assign({ className: 'spotlight-search-result-title' }, { children: (_a = result.label) !== null && _a !== void 0 ? _a : result.id }))] })), _jsx("p", Object.assign({ className: 'spotlight-search-result-type' }, { children: TypeText }))] })));
}
