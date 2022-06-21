import React, { MouseEvent, useMemo } from 'react';
import styled from 'styled-components';

import type { Command, ItemIcon, Result as ResultType } from '@/types';
import { getCommandIcon } from '@/utils/get-command-icon';
import { useSpotlightContext } from '@/utils';

interface Props {
    hasIcons: boolean;
    result: ResultType;
    index: number;
    selected: boolean;
    onSoftSelect: (index: number) => void;
    onSelect: (item: ResultType) => any | Promise<any>;
}

let lastMouseX = 0;
let lastMouseY = 0;

export function Result ({ hasIcons, result, index, selected, onSoftSelect, onSelect }: Props): JSX.Element | null {
    const spotlight = useSpotlightContext();
    const enableFocus = () => onSoftSelect(index);

    const icon = useMemo(() => {
        if (!result.item.options?.icon) return null;
        // Check if the icon is within the icon set
        const Icon = getCommandIcon(result.item.options.icon as ItemIcon);
        if (Icon) return <Icon size={24} color='gray4' />;
        // Check if the icon is an image url
        let url;
        try {
            url = new URL(result.item.options.icon);
        } catch {}
        /// Display the image
        if (url?.protocol === 'https:' || url?.protocol === 'http:') {
            return <ImageIcon src={url.href} />;
        }
        // Display the possible text / emoji
        return <TextIcon>{result.item.options.icon}</TextIcon>;
    }, [result]);

    const TypeText = useMemo(() => {
        // When a question is shown, the type should always return "Select option"
        if (spotlight.type === 'question') return 'Select option';

        if (result.item.type === 'command') {
            // When a question is shown, the type should always return "Select option"
            if ((result.item as Command).parentCommand) return 'Select option';
            return 'Run command';
        }
        return 'Jump to';
    }, [spotlight, result]);

    const handleAction = () => {
        onSelect(result);
    };

    // Register the mouse movement to check if the mouse has actually moved or the content below has shifted.
    const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
        if (e.clientX === lastMouseX && e.clientY === lastMouseY) return;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        enableFocus();
    };

    return (
        // eslint-disable-next-line react/jsx-handler-names
        <Container id={`command-${index}`} $selected={selected} onClick={handleAction} onMouseMove={handleMouseMove} onFocus={enableFocus}>
            <Left>
                {hasIcons && (
                    <IconWrapper>
                        {icon}
                    </IconWrapper>
                )}
                <Title>{result.item.title}</Title>
            </Left>
            {selected && (
                <Type>{TypeText}</Type>
            )}
        </Container>
    );
}

const Container = styled.button<{ $selected: boolean }>`
    ${(p) => p.theme.flex.row({ align: 'center' })}
    height: 45px;
    min-height: 45px;
    border-radius: 10px;
    border: 0;
    outline: 0;
    padding: 0 15px;
    background-color: transparent;
    cursor: pointer;
    overflow: hidden;
    box-sizing: border-box;

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
    box-sizing: border-box;
    flex: 1;
`;

const IconWrapper = styled.div`
    ${(p) => p.theme.flex.row({ justify: 'center', align: 'center' })}
    width: 24px;
    height: 24px;
    box-sizing: border-box;
    margin-right: 15px;
`;

const Title = styled.p`
    ${(p) => p.theme.text.System.regular(15, 'gray1')}
    margin: 0;
    padding: 0;
    white-space: nowrap;
    overflow: hidden;
    display: block;
    text-overflow: ellipsis;
`;

const Type = styled.p`
    ${(p) => p.theme.text.System.regular(15, 'gray5')}
    animation: ${(p) => p.theme.animation.fadeIn} 0.2s ease-in-out;
    margin: 0;
    padding: 0;
    text-align: right;

    @media(max-width: 450px) {
        display: none;
    }
`;

const TextIcon = styled.p`
    ${(p) => p.theme.text.System.regular(16, 'gray4')}
    width: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
`;

const ImageIcon = styled.img`
    border-radius: 5px;
    width: 24px;
    height: 24px;
`;
