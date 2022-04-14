import { Command, Item, JumpTo } from '@/types';

export function executeItem (item: Item, param?: string): any | Promise<any> {
    if (item.type === 'command') {
        return (item as Command).action(param);
    } else {
        // TODO: support external links
        window.location.href = (item as JumpTo).page;
    }
}
