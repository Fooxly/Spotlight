import { Ref } from 'react';
import { SpotlightType } from '../../types';
interface Props {
    hasResults: boolean;
    placeholder?: string;
    value: string;
    loading: boolean;
    fref: Ref<HTMLInputElement>;
    type: SpotlightType;
    onChange: (value: string) => void;
}
export declare function SearchInput({ hasResults, placeholder, value, loading, fref, type, onChange }: Props): JSX.Element;
export {};
