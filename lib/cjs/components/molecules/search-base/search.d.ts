/// <reference types="react" />
import { SearchInputProps } from '../search-input';
import './styles.css';
interface Props extends SearchInputProps {
    onItemSelect?: (item: string) => void;
    results?: string[];
}
export declare function Search(props: Props): JSX.Element;
export {};
