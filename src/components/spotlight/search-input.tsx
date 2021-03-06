import React, { ChangeEvent, Ref } from 'react';
import styled from 'styled-components';

import { Loading } from './loading';

import { ArrowIcon, SearchIcon, TimesIcon } from '@/icons/line';
import { SpotlightType } from '@/types';

// create the spotlight wrapper if this is not already created
let spotlightWrapper: HTMLDivElement | null = null;
if (typeof window !== 'undefined') {
    spotlightWrapper = document.querySelector<HTMLDivElement>('#spotlight');
    if (!spotlightWrapper) {
        spotlightWrapper = document.createElement('div');
        spotlightWrapper.id = 'spotlight';
        document.body.append(spotlightWrapper);
    }
}

interface Props {
    hasResults: boolean;
    placeholder?: string;
    value: string;
    loading: boolean;
    fref: Ref<HTMLInputElement>;
    type: SpotlightType;
    onChange: (value: string) => void;
}

export function SearchInput ({ hasResults, placeholder, value, loading, fref, type, onChange }: Props): JSX.Element {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        // Only update the text when the value is not the same anymore -> important for the hotkeys
        if (e.target.value.length !== value.length) {
            onChange(e.target.value);
        }
    };

    const handleClear = () => onChange('');

    return (
        <SearchBar $hasResults={hasResults}>
            <Input
                autoFocus
                ref={fref}
                placeholder={placeholder ?? 'Search or jump to...'}
                value={value}
                onChange={handleChange}
            />
            <SearchIconWrapper>
                {type !== 'search' ? (
                    <ArrowIcon direction='right' size={24} color='gray4' />
                ) : loading ? (
                    <Loading size={22} color='blue' thickness={3} />
                ) : (
                    <SearchIcon size={24} color='gray4' />
                )}
            </SearchIconWrapper>
            {value?.length > 0 && (
                <ClearButton onClick={handleClear}>
                    <TimesIcon size={8} color='gray10' />
                </ClearButton>
            )}
        </SearchBar>
    );
}

const SearchBar = styled.div<{ $hasResults: boolean }>`
    ${(p) => p.theme.flex.row({ align: 'center' })}
    position: relative;
    background-color: ${(p) => p.theme.color.gray10};
    box-sizing: border-box;

    ${(p) => p.$hasResults && `
        border-bottom: 1px solid ${p.theme.color.gray8};
    `}
`;

const Input = styled.input`
    ${(p) => p.theme.text.System.regular(18, 'gray1')}
    background-color: ${(p) => p.theme.color.gray10};
    flex: 1;
    height: 55px;
    border: 0;
    padding: 0 50px;

    &:focus {
        outline: 0;
    }

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

const ClearButton = styled.button`
    ${(p) => p.theme.flex.col({ justify: 'center', align: 'center' })}
    border: 0;
    outline: 0;
    border-radius: 100px;
    background-color: ${(p) => p.theme.color.gray2};
    position: absolute;
    right: 15px;
    width: 22px;
    height: 22px;
    cursor: pointer;
`;
