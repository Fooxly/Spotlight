import { jsx as _jsx } from "react/jsx-runtime";
import { Search as SearchComponent } from '../../../components/molecules';
import './styles.css';
export function Search() {
    // TODO: give the correct items to the search input
    // TODO: add support for pressing backspace to go back (function)
    // TODO: forward props from the search input
    return (_jsx(SearchComponent, { type: 'input' }));
}
