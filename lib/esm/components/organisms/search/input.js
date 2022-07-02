import { jsx as _jsx } from "react/jsx-runtime";
import { Search } from '../../../components/molecules';
import './styles.css';
export function Input() {
    // TODO: give the correct items to the search input
    // TODO: add support for pressing backspace to go back (function)
    // TODO: forward props from the search input
    return (_jsx(Search, { type: 'input' }));
}
