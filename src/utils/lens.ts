/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
export const lens = (obj: any, path: string): any =>
    path.split('.').reduce((o, key) => o?.[key] !== undefined ? o[key] : null, obj);
