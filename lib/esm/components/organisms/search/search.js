import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { Container, Overlay } from '../../../components/atoms';
import './styles.css';
export function Search() {
    const [visible, setVisible] = useState(false);
    return (_jsx(Overlay, Object.assign({ visible: visible, setVisible: setVisible }, { children: _jsx("div", Object.assign({ id: 'spotlight-search' }, { children: _jsx(Container, { children: "spotlight" }) })) })));
}
