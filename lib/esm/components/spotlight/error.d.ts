/// <reference types="react" />
interface Props {
    message: string;
    onDismiss: () => void;
}
export declare function Error({ message, onDismiss }: Props): JSX.Element | null;
export {};
