import React, { MouseEvent, useMemo } from 'react';

import { Result } from '@/types';
import { getLocalIcon, useSearchContext } from '@/utils';
import { Icons } from '@/utils/constants/icons';

import './styles.css';

interface Props {
    result: Result;
}

let lastMouseX = -1;
let lastMouseY = -1;

export function SearchResult ({ result }: Props): JSX.Element {
    const { selectedItem, setSelectedItem, setParentId } = useSearchContext();

    const TypeText = useMemo(() => {
        if (result.type === 'option') return 'Select option';
        if (result.type === 'command') return 'Run command';
        if (result.type === 'page') return 'Jump to';
        return '';
    }, [result.type]);

    const Icon = useMemo(() => {
        if (!result.icon?.trim?.()?.length) return null;
        // Check if the icon is within the icon set
        const LocalIcon = getLocalIcon(result.icon as typeof Icons[number]);
        if (LocalIcon) return <LocalIcon size={24} color={result.iconColor ?? 'gray4'} />;
        // Check if the icon is an image url
        let url;
        try {
            url = new URL(result.icon);
        } catch {}
        /// Display the image
        if (url?.protocol === 'https:' || url?.protocol === 'http:') {
            return <img src={url.href} />;
        }
        // Display the possible text / emoji
        return <p>{result.icon}</p>;
    }, [result.icon, result.iconColor]);

    const enableFocus = () => setSelectedItem(result.id);

    const handleMouseMove = (ev: MouseEvent<HTMLButtonElement>) => {
        if (ev.clientX === lastMouseX && ev.clientY === lastMouseY) return;
        const updateFocus = (lastMouseX > -1 && lastMouseY > -1);
        lastMouseX = ev.clientX;
        lastMouseY = ev.clientY;
        if (updateFocus) enableFocus();
    };

    const handlePickResult = () => {
        if (!result.children?.length) {
            result.action(result);
            return;
        }
        setParentId(result.id);
    };

    return (
        <button
            id={`option-${result.id}`}
            className={`spotlight-search-result ${selectedItem === result.id ? 'spotlight-search-result-selected' : ''}`.trim()}
            onMouseMove={handleMouseMove}
            onClick={handlePickResult}
            // eslint-disable-next-line react/jsx-handler-names
            onFocus={enableFocus}
        >
            <div className='spotlight-search-result-left'>
                <div className='spotlight-search-result-icon'>
                    {Icon}
                </div>
                <p className='spotlight-search-result-title'>
                    {result.label ?? result.id}
                </p>
            </div>
            <p className='spotlight-search-result-type'>{TypeText}</p>
        </button>
    );
}
