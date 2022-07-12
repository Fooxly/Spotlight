import { useCallback, useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import {
    updateCatalog,
    useSearchContext,
    ERRORS,
    generateId,
    updateHistory,
    registry,
    FORCE_UPDATE_EVENT,
    CATALOG_UPDATE_EVENT,
} from '@/utils';
import { Answer, RegistryItem, Result, SpotlightOptions } from '@/types';
import { getResultById } from '@/utils/search';

const preventDefault = (ev: KeyboardEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
};

export function Default (props: SpotlightOptions): null {
    const {
        type,
        visible,
        selectedItem,
        setType,
        setError,
        setVisible,
        setParentId,
        setPlaceholder,
        setSelectedItem,
        setLoading,
    } = useSearchContext();

    const [forceUpdate, setForceUpdate] = useState(Date.now());

    const forceUpdateEvent = useCallback(() => {
        setForceUpdate(Date.now());
    }, []);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(FORCE_UPDATE_EVENT, forceUpdateEvent as any);
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(FORCE_UPDATE_EVENT, forceUpdateEvent as any);
        };
    }, [forceUpdateEvent]);

    const handleSpotlightEnd = useCallback(() => {
        setVisible(false);
        setLoading(false);
        // eslint-disable-next-line unicorn/no-useless-undefined
        setError(undefined);
        // eslint-disable-next-line unicorn/no-useless-undefined
        setSelectedItem(undefined);
    }, [setError, setLoading, setSelectedItem, setVisible]);

    const handleSpotlightResultClicked = useCallback(() => {
        setLoading(false);
        // eslint-disable-next-line unicorn/no-useless-undefined
        setParentId(undefined);
        handleSpotlightEnd();
    }, [handleSpotlightEnd, setLoading, setParentId]);

    const handleAction = useCallback(async (result: Result, value?: string) => {
        // eslint-disable-next-line unicorn/no-useless-undefined
        setError(undefined);
        if (result.parent) {
            const parent = getResultById(result.parent);
            if (!parent) {
                // eslint-disable-next-line unicorn/no-useless-undefined
                setParentId(undefined);
                setError(ERRORS.PARENT_NOT_FOUND);
                return;
            }
            await handleAction(parent, value);
            return;
        }
        // get the registry item based on the result
        const item = registry.items.find((item) => item.id === result.id);
        if (!item) return;
        if (item.confirm && !confirm(
            typeof item.confirm === 'string'
                ? item.confirm
                : 'Are you sure you want to continue? This could have major consequences.',
        )) {
            return;
        }
        updateHistory(result);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const actionResult = item.action(value);
        // update loading if there is a promise
        if (actionResult instanceof Promise) {
            setLoading(true);
            void actionResult.then(() => {
                handleSpotlightResultClicked();
            }).catch((error: { message: string; port: number; reason?: string | Error }) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                const err = ERRORS[error.message as any];
                setError({
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    error: (err ?? ERRORS.UNKNOWN) as unknown as ERRORS,
                    props: {
                        port: error.port,
                        message: error.message,
                    },
                });
                setLoading(false);
            });
        } else {
            handleSpotlightResultClicked();
        }
    }, [handleSpotlightResultClicked, setError, setLoading, setParentId]);

    const formatAnswers = useCallback((item: Answer | string, parentId: string, parentObject?: Answer | RegistryItem): Result => {
        const id = generateId(typeof item === 'string' ? item : item.label ?? item.key);
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
        if (type !== 'search') return;
        const newResults: Result[] = registry.items.map((item) => formatResult(item));
        updateCatalog(newResults);
        const ev = new CustomEvent(CATALOG_UPDATE_EVENT, {
            bubbles: false,
        });
        document.dispatchEvent(ev);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formatResult, type, registry.items, forceUpdate]);

    const handleSpotlightStart = useCallback(() => {
        handleSpotlightUpdate();
        // eslint-disable-next-line unicorn/no-useless-undefined
        setError(undefined);
        // eslint-disable-next-line unicorn/no-useless-undefined
        setPlaceholder(undefined);
        setType('search');
        setVisible(true);
    }, [handleSpotlightUpdate, setError, setPlaceholder, setType, setVisible]);

    useEffect(() => {
        handleSpotlightUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleSpotlightUpdate, registry.items, forceUpdate]);

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
