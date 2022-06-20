import React from 'react';
import styled from 'styled-components';

import { Result as ResultItem } from './result';

import type { Result } from '@/types';
import { TimesIcon } from '@/icons/line';

interface Props {
    title: string;
    results: Result[];
    showIcons: boolean;
    selectedIndex: number;
    onResultSoftSelect: (index: number) => void;
    onResultSelect: (result: Result) => any | Promise<any>;
    onRemove?: () => void;
    action?: () => void;
    actionText?: string;
}

export function Section ({
    title,
    results,
    showIcons,
    selectedIndex,
    onResultSoftSelect,
    onResultSelect,
    onRemove,
    action,
    actionText,
}: Props): JSX.Element | null {
    if (!results?.length) return null;
    return (
        <>
            <ResultSection>
                <ResultSectionTitle>{title}</ResultSectionTitle>
                {action && actionText && (
                    // eslint-disable-next-line react/jsx-handler-names
                    <SectionAction onClick={action}>
                        {actionText}
                    </SectionAction>
                )}
                {!!onRemove && (
                    // eslint-disable-next-line react/jsx-handler-names
                    <SectionButton onClick={onRemove}>
                        <TimesIcon size={8} color='gray10' />
                    </SectionButton>
                )}
            </ResultSection>
            {results.sort((a, b) => a.index - b.index).map((result) => {
                return (
                    <ResultItem
                        key={result.item.title}
                        index={result.index}
                        result={result}
                        hasIcons={showIcons}
                        selected={selectedIndex === result.index}
                        // eslint-disable-next-line react/jsx-handler-names
                        onSoftSelect={onResultSoftSelect}
                        // eslint-disable-next-line react/jsx-handler-names
                        onSelect={onResultSelect}
                    />
                );
            })}
        </>
    );
}

const SectionButton = styled.button`
    ${(p) => p.theme.flex.col({ justify: 'center', align: 'center' })}
    border: 0;
    outline: 0;
    border-radius: 100px;
    background-color: ${(p) => p.theme.color.gray2};
    position: absolute;
    right: 0;
    width: 18px;
    height: 18px;
    cursor: pointer;
    padding: 2px 6px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease-in-out;
    will-change: opacity, pointer-events;
`;

const SectionAction = styled.button`
    ${(p) => p.theme.flex.col({ justify: 'center', align: 'center' })}
    ${(p) => p.theme.text.System.regular(14, 'blue')}
    border: 0;
    outline: 0;
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease-in-out, color 0.2s ease-in-out;
    will-change: opacity, color, pointer-events;

    &:hover {
        color: ${(p) => p.theme.color.teal};
    }
`;

const ResultSection = styled.div`
    ${(p) => p.theme.flex.row({ justify: 'space-between', align: 'center' })}
    padding: 7px 5px;
    position: relative;

    :hover {
        > ${SectionButton}, > ${SectionAction} {
            pointer-events: auto;
            opacity: 1;
        }
    }
`;

const ResultSectionTitle = styled.p`
    ${(p) => p.theme.text.System.semibold(14, 'gray4')}
    margin: 0;
    padding: 0;
`;
