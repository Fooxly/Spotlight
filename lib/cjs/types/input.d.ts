import { Icons } from '../utils/constants/icons';
export interface Answer {
    key: string;
    label?: string;
    icon?: (typeof Icons[number]) | string;
}
