import { updateHistory } from './history';

import type { Command, Item, JumpTo } from '@/types';

export function executeItem (item: Item, param?: string): any | Promise<any> {
    if (
        item.options?.warnBeforeUse &&
        !confirm(
            typeof item.options.warnBeforeUse === 'string'
                ? item.options.warnBeforeUse
                : 'Are you sure you want to continue? This could have major consequences.',
        )
    ) return;
    updateHistory(item);

    if (item.type === 'command') {
        return (item as Command).action(param);
    } else {
        window.location.href = (item as JumpTo).page;
    }
}
