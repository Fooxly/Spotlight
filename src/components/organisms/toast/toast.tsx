import React, { useEffect, useMemo, useState } from 'react';

import { TOAST_EVENT_KEY } from '@/utils';
import { InfoIcon, WarningCircleIcon } from '@/icons/line';
import { ToastEvent } from '@/types';

let timeout: NodeJS.Timeout | null = null;

export function Toast (): JSX.Element | null {
    const [message, setMessage] = useState<ToastEvent | null>(null);
    const [show, setShow] = useState<boolean>(false);

    const handleNewToastMessage = (ev: CustomEvent<ToastEvent>) => {
        if (timeout) clearTimeout(timeout);
        setShow(true);
        setMessage(ev.detail);
        timeout = setTimeout(() => {
            setShow(false);
        }, 3000);
    };

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.removeEventListener(TOAST_EVENT_KEY, handleNewToastMessage as any, false);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.addEventListener(TOAST_EVENT_KEY, handleNewToastMessage as any, false);
    }, []);

    const Icon = useMemo(() => {
        if (!message) return null;
        if (message.type === 'info') return <InfoIcon size={28} color='blue' />;
        if (message.type === 'warning') return <WarningCircleIcon size={28} color='orange' />;
        if (message.type === 'error') return <WarningCircleIcon size={28} color='red' />;
        return null;
    }, [message]);

    if (!message) return null;
    return (
        <div className='spotlight-toast'>
            <div className={`spotlight-toast-pill spotlight-pill-${show ? 'enabled' : 'disabled'}`}>
                {Icon}
                <p className='spotlight-toast-text'>{message.message}</p>
            </div>
        </div>
    );
}
