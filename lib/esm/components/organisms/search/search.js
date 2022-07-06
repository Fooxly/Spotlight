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
    const [error, setError] = useState();
    const [catalog, setCatalog] = useState([]);
    const [parentId, setParentId] = useState();
    const [placeholder, setPlaceholder] = useState();
    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState();
    return (_jsxs(SearchContext.Provider, Object.assign({ value: {
            type,
            setType,
            visible,
            setVisible,
            error,
            setError,
            catalog,
            setCatalog,
            parentId,
            setParentId,
            placeholder,
            setPlaceholder,
            loading,
            setLoading,
            selectedItem,
            setSelectedItem,
        } }, { children: [_jsx(SearchBase, {}), _jsx(Question, {}), _jsx(Default, Object.assign({}, props))] })));
}
