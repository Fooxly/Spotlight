import { Icons } from '../utils/constants/icons';
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
    category?: string;
    options?: RegisterChildItem[] | string[];
}
export interface RegisterChildItem extends IconProps {
    label: string;
}
export interface RegistryItem extends IconProps {
    id: string;
    type: 'command' | 'page';
    label: string;
    category: string;
    action: (result?: string) => any | Promise<any | unknown | void>;
    options?: RegisterOptions[] | string[];
}
export interface Result {
    id: string;
    key: string;
    label: string;
    icon?: string;
    iconColor?: string;
    category: string;
    action?: (result?: string) => any | Promise<any | unknown | void>;
    type: 'option' | 'command' | 'page';
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
export {};
