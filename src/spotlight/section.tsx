import React from 'react';
import styled from 'styled-components';
import { TimesIcon } from '@/icons/line';
import { Result as ResultItem } from './result';
import { Item, Result } from '@/types';

interface Props {
    title: string;
    results: Result[];
    showIcons: boolean;
    selectedIndex: number;
    onResultSoftSelect: (index: number) => void;
    onResultSelect: (result: Result) => any | Promise<any>;
    onRemove?: () => void;
}

export function Section ({ title, results, showIcons, selectedIndex, onResultSoftSelect, onResultSelect, onRemove }: Props): JSX.Element | null {
    if (!results?.length) return null;
    return (
        <>
            <ResultSection>
                <ResultSectionTitle>{title}</ResultSectionTitle>
                {!!onRemove && (
                    <SectionButton onClick={onRemove}>
                        <TimesIcon size={7} color='gray10' />
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
                        onSoftSelect={onResultSoftSelect}
                        onSelect={onResultSelect}
                    />
                )
            })}
        </>
    );
}

const SectionButton = styled.button`
    ${(p) => p.theme.flex.col({ justify: 'center', align: 'center' })}
    border-radius: 100px;
    background-color: ${(p) => p.theme.color.gray2};
    position: absolute;
    right: 15px;
    width: 18px;
    height: 18px;
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease-in-out;
    will-change: opacity, pointer-events;
`;

const ResultSection = styled.div`
    ${(p) => p.theme.flex.row({ justify: 'space-between', align: 'center' })}
    padding: 7px 5px;
    position: relative;

    :hover {
        > ${SectionButton} {
            pointer-events: auto;
            opacity: 1;
        }
    }
`;

const ResultSectionTitle = styled.p`
    ${(p) => p.theme.text.System.semibold(14, 'gray4')}
`;
