/// <reference types="react" />
import type { Result as ResultType } from '../../types';
interface Props {
    hasIcons: boolean;
    result: ResultType;
    index: number;
    selected: boolean;
    onSoftSelect: (index: number) => void;
    onSelect: (item: ResultType) => any | Promise<any>;
}
export declare function Result({ hasIcons, result, index, selected, onSoftSelect, onSelect }: Props): JSX.Element | null;
export {};
