var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useCallback, useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { updateCatalog, useSearchContext, ERRORS, generateId, updateHistory, registry, FORCE_UPDATE_EVENT, CATALOG_UPDATE_EVENT, } from '../../../utils';
import { getResultById } from '../../../utils/search';
import './styles.css';
const preventDefault = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
};
export function Default(props) {
    const { type, visible, selectedItem, setType, setError, setVisible, setParentId, setPlaceholder, setSelectedItem, setLoading, } = useSearchContext();
    const [forceUpdate, setForceUpdate] = useState(Date.now());
    const forceUpdateEvent = useCallback(() => {
        setForceUpdate(Date.now());
    }, []);
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(FORCE_UPDATE_EVENT, forceUpdateEvent);
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            document.removeEventListener(FORCE_UPDATE_EVENT, forceUpdateEvent);
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
    const handleAction = useCallback((result, value) => __awaiter(this, void 0, void 0, function* () {
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
            yield handleAction(parent, value);
            return;
        }
        // get the registry item based on the result
        const item = registry.items.find((item) => item.id === result.id);
        if (!item)
            return;
        if (item.confirm && !confirm(typeof item.confirm === 'string'
            ? item.confirm
            : 'Are you sure you want to continue? This could have major consequences.')) {
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
            }).catch((error) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                const err = ERRORS[error.message];
                setError({
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    error: (err !== null && err !== void 0 ? err : ERRORS.UNKNOWN),
                    props: {
                        port: error.port,
                        message: error.message,
                    },
                });
                setLoading(false);
            });
        }
        else {
            handleSpotlightResultClicked();
        }
    }), [handleSpotlightResultClicked, setError, setLoading, setParentId]);
    const formatAnswers = useCallback((item, parentId, parentObject) => {
        var _a, _b, _c, _d;
        const id = generateId(typeof item === 'string' ? item : (_a = item.label) !== null && _a !== void 0 ? _a : item.key);
        return {
            type: 'option',
            id,
            key: typeof item === 'string' ? item : item.key,
            label: typeof item === 'string' ? item : (_b = item.label) !== null && _b !== void 0 ? _b : item.key,
            icon: typeof item === 'string' ? undefined : item.icon,
            iconColor: typeof item === 'string' ? undefined : item.iconColor,
            category: (_c = parentObject === null || parentObject === void 0 ? void 0 : parentObject.label) !== null && _c !== void 0 ? _c : '',
            action: (result) => handleAction(result, result.key),
            parent: parentId,
            children: typeof item === 'string' ? undefined : (_d = item.options) === null || _d === void 0 ? void 0 : _d.map((option) => formatAnswers(option, id, parentObject)),
        };
    }, [handleAction]);
    const formatResult = useCallback((item) => {
        var _a;
        return {
            id: item.id,
            key: item.label,
            label: item.label,
            type: item.type,
            icon: item.icon,
            iconColor: item.iconColor,
            category: item.category,
            action: (result) => handleAction(result, result.key),
            children: (_a = item.options) === null || _a === void 0 ? void 0 : _a.map((option) => formatAnswers(option, item.id, item)),
        };
    }, [formatAnswers, handleAction]);
    const handleSpotlightUpdate = useCallback(() => {
        if (type !== 'search')
            return;
        const newResults = registry.items.map((item) => formatResult(item));
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
    useHotkeys(props.spotlightShortcut, (ev) => {
        preventDefault(ev);
        if (!visible)
            handleSpotlightStart();
        else
            handleSpotlightEnd();
    }, {
        enabled: type === 'search',
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }, [visible, selectedItem, type]);
    return null;
}
