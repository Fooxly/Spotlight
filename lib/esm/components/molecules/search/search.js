import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { SearchInput } from '../search-input';
import { Container, Overlay } from '../../../components/atoms';
import './styles.css';
export function Search(props) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        setVisible(true);
    }, []);
    return (_jsx(Overlay, Object.assign({ visible: visible, setVisible: setVisible }, { children: _jsx(Container, Object.assign({ className: 'spotlight-search-box' }, { children: _jsx(SearchInput, Object.assign({}, props)) })) })));
}
