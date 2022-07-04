import { useCallback, useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import {
    getUUID,
    Registry,
    REGISTRY_UPDATE_EVENT_KEY,
    useSearchContext,
} from '@/utils';
import { Answer, RegistryItem, Result, SpotlightOptions } from '@/types';
import { getResultById } from '@/utils/search';

import './styles.css';

const preventDefault = (ev: KeyboardEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
};

export function Default (props: SpotlightOptions): null {
    const {
        type,
        visible,
        catalog,
        selectedItem,
        setType,
        setVisible,
        setCatalog,
        setPlaceholder,
        setSelectedItem,
        setLoading,
    } = useSearchContext();

    const handleSpotlightEnd = useCallback(() => {
        setVisible(false);
        setLoading(false);
        // eslint-disable-next-line unicorn/no-useless-undefined
        setSelectedItem(undefined);
    }, [setLoading, setSelectedItem, setVisible]);

    const handleAction = useCallback(async (result: Result, value?: string) => {
        console.log(result.id);
        if (result.parent) {
            await handleAction(getResultById(catalog, result.parent)!, value);
            return;
        }
        // get the registry item based on the result
        const item = Registry.find((item) => item.id === result.id);
        console.log(result.key, value);
        // TODO: handle the action from the registry item
        // TODO: update loading if there is a promise
        const actionResult = await item?.action(value);
        // TODO: handle errors with error widget
        handleSpotlightEnd();
    }, [catalog, handleSpotlightEnd]);

    const formatAnswers = useCallback((item: Answer | string, parentId: string, parentObject?: Answer | RegistryItem): Result => {
        // const id = `${parentId}-${typeof item === 'string' ? item : item.key}`;
        const id = getUUID();
        return {
            type: 'option',
            id,
            key: typeof item === 'string' ? item : item.key,
            label: typeof item === 'string' ? item : item.label ?? item.key,
            icon: typeof item === 'string' ? undefined : item.icon,
            iconColor: typeof item === 'string' ? undefined : item.iconColor,
            category: parentObject?.label ?? '',
            action: (result) => handleAction(result, result.key),
            parent: parentId,
            children:
                typeof item === 'string' ? undefined : item.options?.map((option) => formatAnswers(option, id, parentObject)),
        };
    }, [handleAction]);

    const formatResult = useCallback((item: RegistryItem): Result => {
        return {
            id: item.id,
            key: item.label,
            label: item.label,
            type: item.type,
            icon: item.icon,
            iconColor: item.iconColor,
            category: item.category,
            action: (result) => handleAction(result, result.key),
            children: item.options?.map((option) => formatAnswers(option, item.id, item)),
        };
    }, [formatAnswers, handleAction]);

    const handleSpotlightUpdate = useCallback(() => {
        const newResults: Result[] = Registry.map((item) => formatResult(item));
        setCatalog(newResults);
    }, [formatResult, setCatalog]);

    const handleSpotlightStart = useCallback(() => {
        handleSpotlightUpdate();
        // eslint-disable-next-line unicorn/no-useless-undefined
        setPlaceholder(undefined);
        setType('search');
        setVisible(true);
    }, [handleSpotlightUpdate, setPlaceholder, setType, setVisible]);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.removeEventListener(REGISTRY_UPDATE_EVENT_KEY, handleSpotlightUpdate as any);
        if (type === 'search') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.addEventListener(REGISTRY_UPDATE_EVENT_KEY, handleSpotlightUpdate as any);
        }
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(REGISTRY_UPDATE_EVENT_KEY, handleSpotlightUpdate as any);
        };
    }, [handleSpotlightUpdate, type]);

    useHotkeys(props.spotlightShortcut!, (ev) => {
        preventDefault(ev);
        if (!visible) handleSpotlightStart();
        else handleSpotlightEnd();
    }, {
        enabled: type === 'search',
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }, [visible, selectedItem, type]);

    return null;
}
