import React from 'react';

import './styles.css';

interface Props extends React.HTMLProps<HTMLDivElement> {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

export function Overlay ({ visible, setVisible, children, className, ...restProps }: Props): JSX.Element | null {
    if (!visible) return null;
    return (
        <div {...restProps} className={`${className ?? ''} spotlight-overlay`}>
            <div className='spotlight-overlay-background' onClick={() => setVisible(false)} />
            <div className='spotlight-overlay-content'>
                <>
                    {children}
                </>
            </div>
        </div>
    );
}
