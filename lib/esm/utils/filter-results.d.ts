import type { Category, Item } from '../types';
export declare function filterResults(searchText: string, menu?: {
    title: string;
    items: Item[];
}): Category[];
