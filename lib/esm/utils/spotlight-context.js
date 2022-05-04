import { createContext, useContext } from 'react';
export const SpotlightContext = createContext({
    type: 'search',
});
export const useSpotlightContext = () => useContext(SpotlightContext);
