/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
export const lens = (obj, path) => path.split('.').reduce((o, key) => (o === null || o === void 0 ? void 0 : o[key]) !== undefined ? o[key] : null, obj);
