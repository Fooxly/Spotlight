import React, { useMemo } from 'react';

import './styles.css';
import { useSearchContext } from '@/utils';
import { DEV_TIPS, TIPS } from '@/utils/constants/tips';

const decodeHTML = (html: string): string => {
    const e = document.createElement('div');
    e.innerHTML = html;
    return e.innerHTML;
};

interface Props {
    visible?: boolean;
}

export function SearchTips ({ visible: visibleProp = true }: Props): JSX.Element | null {
    const { visible, devMode, showTips } = useSearchContext();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const finalTips = useMemo(() => [...TIPS, ...(devMode ? DEV_TIPS : [])], [TIPS, DEV_TIPS, devMode]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const activeTip = useMemo(() => finalTips[Math.floor(Math.random() * finalTips.length)], [finalTips, visible]);

    if (!visibleProp || !showTips) return null;
    return (
        <p className='spotlight-search-tips' dangerouslySetInnerHTML={{ __html: decodeHTML(activeTip) ?? '' }} />
    );
}
