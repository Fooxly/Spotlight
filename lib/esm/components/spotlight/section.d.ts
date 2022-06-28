/// <reference types="react" />
import type { Result } from '../../types';
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
export declare function Section({ title, results, showIcons, selectedIndex, onResultSoftSelect, onResultSelect, onRemove, action, actionText, }: Props): JSX.Element | null;
export {};
