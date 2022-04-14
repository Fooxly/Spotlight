import { Item } from '@/types';

export function filterResults (searchText: string, items: Item[]) {
    const text = searchText.toLowerCase().trim();
    const words = text.split(' ').filter((word) => word.length > 1);

    // Return first 8 items to help guide the user for commands
    if (text.length === 0 || words.length === 0) {
        return items.slice(0, 8);
    }

    return items.filter((item) => {
        // check the title for keywords
        const title = item.title.toLowerCase();
        if (title.includes(text)) return true;

        // check the keywords
        const keywords = item.options?.keywords?.map((kw) => kw.toLowerCase());
        if (keywords?.filter((kw) => words.filter((word) => kw.includes(word)).length > 0).length)
            return true;
    })

}
