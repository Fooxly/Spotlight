import { CommandOptions, ItemOptions } from '@/types';

interface Props {
    isDarkMode?: boolean;
    showRecentlyUsed?: number;
}
export declare function Spotlight({ isDarkMode, showRecentlyUsed }: Props): JSX.Element;
export declare function RegisterJumpTo(title: string, page: string, options?: ItemOptions): void;
export declare function RegisterCommand(title: string, action: () => any | Promise<any | unknown | void>, options?: CommandOptions): void;
export declare function Unregister(title: string): void;
declare const _default: {
    Spotlight: typeof Spotlight;
    RegisterJumpTo: typeof RegisterJumpTo;
    RegisterCommand: typeof RegisterCommand;
    Unregister: typeof Unregister;
};
export default _default;
