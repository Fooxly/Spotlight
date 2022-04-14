import React from 'react';
import styled from 'styled-components';
import { Command, Item, JumpTo } from '@/types';
import { getCommandIcon } from '@/utils/get-command-icon';

interface Props {
    hasIcons: boolean;
    item: Item;
    index: number;
    selected: boolean;
    onSoftSelect: (index: number) => void;
    onComplete: () => void;
}

export function Result ({ hasIcons, item, index, selected, onSoftSelect, onComplete }: Props): JSX.Element | null {
    const enableFocus = () => onSoftSelect(index);
    const Icon = getCommandIcon(item.options?.icon);

    const handleAction = () => {
        if (item.type === 'command') {
            (item as Command).action();
        } else {
            window.location.href = (item as JumpTo).page;
        }
        onComplete();
    }

    return (
        <Container id={`command-${item.id}`} $selected={selected} onClick={handleAction} onMouseMove={enableFocus} onFocus={enableFocus}>
            <Left>
                {hasIcons && (
                    <IconWrapper>
                        {!!Icon && <Icon size={24} color='gray4' />}
                    </IconWrapper>
                )}
                <Title>{item.title}</Title>
            </Left>
            {selected && (
                <Type>{item.type === 'command' ? 'Run command' : 'Jump to'}</Type>
            )}
        </Container>
    );
}

const Container = styled.button<{ $selected: boolean; }>`
    ${(p) => p.theme.flex.row({ align: 'center' })}
    height: 45px;
    min-height: 45px;
    border-radius: 10px;
    padding: 0 15px;
    background-color: transparent;
    cursor: pointer;
    overflow: hidden;

    transition: background-color 0.2s ease-in-out;
    will-change: background-color;

    ${(p) => p.$selected && `
        background-color: ${p.theme.color.gray9};
    `}

    @media(max-width: 600px) {
        height: 35px;
    }
`;

const Left = styled.div`
    ${(p) => p.theme.flex.row({ align: 'center' })}
    flex: 1;
`;

const IconWrapper = styled.div`
    ${(p) => p.theme.flex.row({ justify: 'center', align: 'center' })}
    width: 24px;
    height: 24px;
    margin-right: 15px;
`

const Title = styled.p`
    ${(p) => p.theme.text.System.regular(15, 'gray1')}
`;

const Type = styled.p`
    ${(p) => p.theme.text.System.regular(15, 'gray5')}
    animation: ${(p) => p.theme.animation.fadeIn} 0.2s ease-in-out;
`;
