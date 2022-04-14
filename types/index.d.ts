import { ItemOptions } from '@/types';

interface Props {
    isDarkMode?: boolean;
}
export declare function Spotlight({ isDarkMode }: Props): JSX.Element;
export declare function RegisterJumpTo(title: string, page: string, options?: ItemOptions): string;
export declare function RegisterCommand(title: string, action: () => void, options?: ItemOptions): string;
export declare function Unregister(id: string): void;
declare const _default: {
    Spotlight: typeof Spotlight;
    RegisterJumpTo: typeof RegisterJumpTo;
    RegisterCommand: typeof RegisterCommand;
    Unregister: typeof Unregister;
};
export default _default;
