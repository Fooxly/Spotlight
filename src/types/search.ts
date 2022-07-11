import { Icons } from '@/utils/constants/icons';

export interface Answer {
    key: string;
    label?: string;
    icon?: (typeof Icons[number]) | string;
    iconColor?: string;
    options?: string[] | Answer[];
}

interface IconProps {
    icon?: (typeof Icons[number]) | string;
    iconColor?: string;
}

export interface RegisterOptions extends IconProps {
    // To which category the items should be added.
    category?: string;
    // Should the user be warned when they try to execute the item? (A custom warning message can be written here if needed)
    confirm?: boolean | string;
}

export interface RegisterCommandOptions extends RegisterOptions {
    // Possibility to add sub categories to the command.
    options?: Answer[] | string[];
}

export interface RegistryItem extends IconProps {
    id: string;
    type: 'command' | 'page';
    key: string;
    label: string;
    category: string;
    action: (result?: string) => any | Promise<any | unknown | void>;
    // Should the user be warned when they try to execute the item? (A custom warning message can be written here if needed)
    confirm?: boolean | string;
    options?: Answer[] | string[];
}

export interface Result {
    id: string;
    key: string;
    label: string;
    icon?: string;
    iconColor?: string;
    category: string;
    action: (result: Result) => any | Promise<any | unknown | void>;
    type: 'option' | 'command' | 'page';
    parent?: string;
    children?: Result[];
}

export interface Category {
    id: string;
    label: string;
    results: Result[];
    action?: CategoryAction;
}

export interface CategoryAction {
    label: string;
    action: () => void;
}
