import React from 'react';
import './styles.css';
interface Props extends React.HTMLProps<HTMLDivElement> {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}
export declare function Overlay({ visible, setVisible, children, className, ...restProps }: Props): JSX.Element | null;
export {};
