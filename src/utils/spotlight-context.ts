import { createContext, useContext } from 'react';

import { SpotlightType } from '@/types';

export interface SpotlightContextType {
    type: SpotlightType;
}

export const SpotlightContext = createContext<SpotlightContextType>({
    type: 'search',
});

export const useSpotlightContext = () => useContext(SpotlightContext);
