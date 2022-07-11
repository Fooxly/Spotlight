import { RegistryItem } from '../../types';
export declare const registry: {
    store: RegistryItem[];
    items: RegistryItem[];
};
export declare function updateRegistry(newRegistry: RegistryItem[]): void;
export declare function addRegistry(item: RegistryItem): void;
