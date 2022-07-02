"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const react_1 = require("react");
const react_hotkeys_hook_1 = require("react-hotkeys-hook");
const utils_1 = require("../../../utils");
require("./styles.css");
const preventDefault = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
};
function Default(props) {
    const { type, visible, search, results, selectedItem, setType, setVisible, setResults, setShowIcons, setPlaceholder, setSelectedItem, } = (0, utils_1.useSearchContext)();
    const handleSpotlightUpdate = (0, react_1.useCallback)(() => {
        const formatResult = (item) => {
            return {
                id: item.id,
                key: item.label,
                label: item.label,
                type: item.type,
                icon: item.icon,
                iconColor: item.iconColor,
                category: item.category,
                // children: item.options?.map((option) => formatResult(option)),
                // action: item.action,
            };
        };
        // const selectedItemKey = results.find((result) => result.id === selectedItem)?.key;
        // TODO: handle action and child options
        const newResults = utils_1.Registry.map((item) => formatResult(item));
        setShowIcons(newResults.some((result) => result.icon));
        setResults(newResults);
    }, [setResults, setShowIcons]);
    const handleSpotlightStart = (0, react_1.useCallback)(() => {
        handleSpotlightUpdate();
        setPlaceholder(null);
        setType('search');
        setVisible(true);
    }, [handleSpotlightUpdate, setPlaceholder, setType, setVisible]);
    const handleSpotlightEnd = (0, react_1.useCallback)(() => {
        setVisible(false);
        setResults([]);
        setSelectedItem(null);
    }, [setResults, setSelectedItem, setVisible]);
    const handlePickedResult = (0, react_1.useCallback)((ev) => {
        var _a;
        if (type !== 'search')
            return;
        console.log((_a = results.find((result) => result.id === ev.detail.value)) === null || _a === void 0 ? void 0 : _a.key);
    }, [type, results]);
    (0, react_1.useEffect)(() => {
        if (type === 'search') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.addEventListener(utils_1.REGISTRY_UPDATE_EVENT_KEY, handleSpotlightUpdate);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(utils_1.REGISTRY_UPDATE_EVENT_KEY, handleSpotlightUpdate);
        }
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(utils_1.REGISTRY_UPDATE_EVENT_KEY, handleSpotlightUpdate);
        };
    }, [handleSpotlightUpdate, type]);
    (0, react_1.useEffect)(() => {
        if (type === 'search') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.addEventListener(utils_1.PICKED_RESULT_EVENT_KEY, handlePickedResult);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(utils_1.PICKED_RESULT_EVENT_KEY, handlePickedResult);
        }
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(utils_1.PICKED_RESULT_EVENT_KEY, handlePickedResult);
        };
    }, [handlePickedResult, type]);
    (0, react_hotkeys_hook_1.useHotkeys)(props.spotlightShortcut, (ev) => {
        preventDefault(ev);
        if (!visible)
            handleSpotlightStart();
        else
            handleSpotlightEnd();
    }, {
        enabled: type === 'search',
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }, [visible, search, selectedItem, type]);
    return null;
}
exports.Default = Default;
