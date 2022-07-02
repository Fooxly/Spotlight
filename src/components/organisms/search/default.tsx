import { useCallback, useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import {
    PICKED_RESULT_EVENT_KEY,
    Registry,
    REGISTRY_UPDATE_EVENT_KEY,
    useSearchContext,
} from '@/utils';
import { RegistryItem, Result, ResultPickedEvent, SpotlightOptions } from '@/types';

import './styles.css';

const preventDefault = (ev: KeyboardEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
};

export function Default (props: SpotlightOptions): null {
    const {
        type,
        visible,
        search,
        results,
        selectedItem,
        setType,
        setVisible,
        setResults,
        setShowIcons,
        setPlaceholder,
        setSelectedItem,
    } = useSearchContext();

    const handleSpotlightUpdate = useCallback(() => {
        const formatResult = (item: RegistryItem): Result => {
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
        const newResults: Result[] = Registry.map((item) => formatResult(item));

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

    const handlePickedResult = useCallback((ev: CustomEvent<ResultPickedEvent>) => {
        if (type !== 'search') return;
        console.log(results.find((result) => result.id === ev.detail.value)?.key);
    }, [type, results]);

    useEffect(() => {
        if (type === 'search') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.addEventListener(REGISTRY_UPDATE_EVENT_KEY, handleSpotlightUpdate as any);
        } else {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(REGISTRY_UPDATE_EVENT_KEY, handleSpotlightUpdate as any);
        }
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(REGISTRY_UPDATE_EVENT_KEY, handleSpotlightUpdate as any);
        };
    }, [handleSpotlightUpdate, type]);

    useEffect(() => {
        if (type === 'search') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.addEventListener(PICKED_RESULT_EVENT_KEY, handlePickedResult as any);
        } else {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(PICKED_RESULT_EVENT_KEY, handlePickedResult as any);
        }
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(PICKED_RESULT_EVENT_KEY, handlePickedResult as any);
        };
    }, [handlePickedResult, type]);

    useHotkeys(props.spotlightShortcut!, (ev) => {
        preventDefault(ev);
        if (!visible) handleSpotlightStart();
        else handleSpotlightEnd();
    }, {
        enabled: type === 'search',
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }, [visible, search, selectedItem, type]);

    return null;
}
