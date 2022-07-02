import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Question } from './question';
import { Default } from './default';
import { SearchBase } from '../../../components/molecules';
import { SearchContext } from '../../../utils';
import './styles.css';
export function Search(props) {
    const [type, setType] = useState('search');
    const [visible, setVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [placeholder, setPlaceholder] = useState(null);
    const [results, setResults] = useState([]);
    const [showIcons, setShowIcons] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);
    return (_jsxs(SearchContext.Provider, Object.assign({ value: {
            type,
            setType,
            visible,
            setVisible,
            search,
            setSearch,
            placeholder,
            setPlaceholder,
            results,
            setResults,
            showIcons,
            setShowIcons,
            selectedItem,
            setSelectedItem,
        } }, { children: [_jsx(SearchBase, {}), _jsx(Question, {}), _jsx(Default, Object.assign({}, props))] })));
}
