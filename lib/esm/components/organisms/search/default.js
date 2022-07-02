import { useCallback, useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { PICKED_RESULT_EVENT_KEY, Registry, REGISTRY_UPDATE_EVENT_KEY, useSearchContext, } from '../../../utils';
import './styles.css';
const preventDefault = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
};
export function Default(props) {
    const { type, visible, search, results, selectedItem, setType, setVisible, setResults, setShowIcons, setPlaceholder, setSelectedItem, } = useSearchContext();
    const handleSpotlightUpdate = useCallback(() => {
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
        const newResults = Registry.map((item) => formatResult(item));
        setShowIcons(newResults.some((result) => result.icon));
        setResults(newResults);
    }, [setResults, setShowIcons]);
    const handleSpotlightStart = useCallback(() => {
        handleSpotlightUpdate();
        setPlaceholder(null);
        setType('search');
        setVisible(true);
    }, [handleSpotlightUpdate, setPlaceholder, setType, setVisible]);
    const handleSpotlightEnd = useCallback(() => {
        setVisible(false);
        setResults([]);
        setSelectedItem(null);
    }, [setResults, setSelectedItem, setVisible]);
    const handlePickedResult = useCallback((ev) => {
        var _a;
        if (type !== 'search')
            return;
        console.log((_a = results.find((result) => result.id === ev.detail.value)) === null || _a === void 0 ? void 0 : _a.key);
    }, [type, results]);
    useEffect(() => {
        if (type === 'search') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.addEventListener(REGISTRY_UPDATE_EVENT_KEY, handleSpotlightUpdate);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(REGISTRY_UPDATE_EVENT_KEY, handleSpotlightUpdate);
        }
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(REGISTRY_UPDATE_EVENT_KEY, handleSpotlightUpdate);
        };
    }, [handleSpotlightUpdate, type]);
    useEffect(() => {
        if (type === 'search') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.addEventListener(PICKED_RESULT_EVENT_KEY, handlePickedResult);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(PICKED_RESULT_EVENT_KEY, handlePickedResult);
        }
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(PICKED_RESULT_EVENT_KEY, handlePickedResult);
        };
    }, [handlePickedResult, type]);
    useHotkeys(props.spotlightShortcut, (ev) => {
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
