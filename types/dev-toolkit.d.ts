import { CommandOptions } from '@/types';

interface Props {
    isDarkMode?: boolean;
}

export declare function DevToolkit ({ isDarkMode }: Props): JSX.Element;

// Commands
export declare function RegisterJumpTo (title: string, page: string, options?: CommandOptions): string;
export declare function RegisterCommand (title: string, action: () => void, options?: CommandOptions): string;
export declare function Unregister (id: string): void;

export declare const Spotlight: {
    RegisterJumpTo: typeof RegisterJumpTo;
    RegisterCommand: typeof RegisterCommand;
    Unregister: typeof Unregister;
};

export {};
