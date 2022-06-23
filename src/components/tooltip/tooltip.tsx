import React, { useState } from 'react';
import styled from 'styled-components';

import { ReactChildren } from '@/types';

interface Props {
    children?: ReactChildren;
    content: string;
    direction: 'top' | 'bottom' | 'left' | 'right';
    delay?: number;
}

export function Tooltip ({ children, content, direction, delay = 0 }: Props): JSX.Element {
    let timeout: NodeJS.Timeout;
    const [show, setShow] = useState(false);

    const handleShowTip = () => {
        timeout = setTimeout(() => {
            setShow(true);
        }, delay || 0);
    };

    const handleHideTip = () => {
        clearInterval(timeout);
        setShow(false);
    };

    return (
        <Container onMouseEnter={handleShowTip} onMouseLeave={handleHideTip}>
            {children}
            {show && (
                <Tip $direction={direction}>
                    {content}
                </Tip>
            )}
        </Container>
    );
}

const Container = styled.div`
    display: inline-block;
    position: relative;
`;

const Tip = styled.div<{ $direction: 'top' | 'bottom' | 'left' | 'right' }>`
    ${(p) => p.theme.text.System.regular(14, '#fff')}
    position: absolute;
    border-radius: 4px;
    left: 50%;
    transform: translateX(-50%);
    padding: 6px;
    background: #000;
    line-height: 1;
    z-index: 100;
    white-space: nowrap;

    :before {
        content: " ";
        left: 50%;
        border: solid transparent;
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        border-width: 6px;
        margin-left: -6px;
    }

    ${(p) => p.$direction === 'top' && `
        top: -30px;

        :before {
            top: 100%;
            border-top-color: #000;
        }
    `}

    ${(p) => p.$direction === 'right' && `
        left: calc(100% + 30px);
        top: 50%;
        transform: translateX(0) translateY(-50%);

        :before {
            left: -6px;
            top: 50%;
            transform: translateX(0) translateY(-50%);
            border-right-color: #000;
        }
    `}

    ${(p) => p.$direction === 'bottom' && `
        bottom: -30px;

        :before {
            bottom: 100%;
            border-bottom-color: #000;
        }
    `}

    ${(p) => p.$direction === 'left' && `
        left: auto;
        right: calc(100% + 30px);
        top: 50%;
        transform: translateX(0) translateY(-50%);

        :before {
            left: auto;
            right: -12px;
            top: 50%;
            transform: translateX(0) translateY(-50%);
            border-left-color: #000;
        }
    `}
`;
