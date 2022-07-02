import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import { SEARCH_CLOSED_EVENT_KEY } from '@/utils';

import './styles.css';

interface Props extends React.HTMLProps<HTMLDivElement> {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

const preventDefault = (ev: KeyboardEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
};

export function Overlay ({ visible, setVisible, children, className, ...restProps }: Props): JSX.Element | null {
    useHotkeys('esc', (e) => {
        preventDefault(e);
        handleCloseEvent();
    }, {
        enabled: visible,
        enableOnTags: ['INPUT', 'TEXTAREA'],
    }, [setVisible]);

    const handleCloseEvent = () => {
        setVisible(false);
        const ev = new CustomEvent(SEARCH_CLOSED_EVENT_KEY, {
            bubbles: false,
        });
        document.dispatchEvent(ev);
    };

    if (!visible) return null;

    return (
        <div {...restProps} className={`${className ?? ''} spotlight-overlay`.trim()}>
            <div className='spotlight-overlay-background' onClick={handleCloseEvent} />
            <div className='spotlight-overlay-content'>
                <>
                    {children}
                </>
            </div>
        </div>
    );
}
