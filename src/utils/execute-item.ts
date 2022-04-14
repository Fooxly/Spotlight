import { Command, Item, JumpTo } from '@/types';

export function executeItem (item: Item) {
    if (item.type === 'command') {
        (item as Command).action();
    } else {
        // TODO: support external links
        window.location.href = (item as JumpTo).page;
    }
}
