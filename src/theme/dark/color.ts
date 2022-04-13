import { colors as baseColors, getColorFunction, HexColor } from '../base/color';

export const color = getColorFunction({
    ...baseColors,
    green: '#32D74B' as HexColor,
    yellow: '#FFD60A' as HexColor,
    orange: '#FF9F0A' as HexColor,
    red: '#FF453A' as HexColor,
    teal: '#64D2FF' as HexColor,
    blue: '#0A84FF' as HexColor,
    indigo: '#5E5CE6' as HexColor,
    purple: '#BF5AF2' as HexColor,
    pink: '#FF2D55' as HexColor,
    // Shades
    gray10: '#000000' as HexColor,
    gray9: '#1C1C1E' as HexColor,
    gray8: '#2C2C2E' as HexColor,
    gray7: '#3A3A3C' as HexColor,
    gray6: '#48484A' as HexColor,
    gray5: '#636366' as HexColor,
    gray4: '#8E8E93' as HexColor,
    gray3: '#C7C7CC' as HexColor,
    gray2: '#E5E5EA' as HexColor,
    gray1: '#FFFFFF' as HexColor,
});
