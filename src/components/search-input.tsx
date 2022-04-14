import React, { ChangeEvent, createRef, Ref, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { useHotkeys, Options } from 'react-hotkeys-hook';
import { SearchIcon, TimesIcon } from '@/icons/line';
import { Command, Item, Result } from '@/types';

import { COMMANDS, PAGES, getCommandIcon, filterResults, executeItem, getHistory, updateHistory, clearHistory } from '@/utils';
import { Loading } from './loading';
import { Section } from './section';

// create the spotlight wrapper if this is not already created
let wrapper = document.querySelector<HTMLDivElement>('#spotlight');
if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.id = 'spotlight';
    document.body.append(wrapper);
}

interface Props {
    hasResults: boolean;
    placeholder?: string;
    value: string;
    loading: boolean;
    fref: Ref<HTMLInputElement>;
    onChange: (value: string) => void;
}

export function SearchInput ({ hasResults, placeholder, value, loading, fref, onChange }: Props): JSX.Element {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        // Only update the text when the value is not the same anymore -> important for the hotkeys
        if (e.target.value.length !== value.length) {
            onChange(e.target.value);
        }
    }

    const handleClear = () => onChange('');

    return (
        <SearchBar $hasResults={hasResults}>
            <Input
                autoFocus
                ref={fref}
                placeholder={placeholder || 'Search or jump to...'}
                value={value}
                onChange={handleChange}
            />
            <SearchIconWrapper>
                {loading ? (
                    <Loading size={22} color='blue' thickness={3} />
                ) : (
                    <SearchIcon size={24} color='gray4' />
                )}
                </SearchIconWrapper>
            {value?.length > 0 && (
                <CloseButton onClick={handleClear}>
                    <TimesIcon size={8} color='gray10' />
                </CloseButton>
            )}
        </SearchBar>
    )
}

const SearchBar = styled.div<{ $hasResults: boolean }>`
    position: relative;
    ${(p) => p.theme.flex.row({ align: 'center' })}

    ${(p) => p.$hasResults && `
        border-bottom: 1px solid ${p.theme.color.gray8};
    `}
`;

const Input = styled.input`
    ${(p) => p.theme.text.System.regular(18, 'gray1')}
    flex: 1;
    height: 55px;
    padding: 0 50px;

    ::placeholder {
        color: ${(p) => p.theme.color.gray6} !important;
    }
`;

const SearchIconWrapper = styled.div`
    ${(p) => p.theme.flex.col({ justify: 'center', align: 'center' })}
    position: absolute;
    left: 15px;
    margin-bottom: 2px;
`;

const CloseButton = styled.button`
    ${(p) => p.theme.flex.col({ justify: 'center', align: 'center' })}
    border-radius: 100px;
    background-color: ${(p) => p.theme.color.gray2};
    position: absolute;
    right: 15px;
    width: 22px;
    height: 22px;
    cursor: pointer;
`;
