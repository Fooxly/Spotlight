import React from 'react';

import { $icon, IconProps } from './_icon';

export function BellIcon (props: IconProps): JSX.Element {
    const [color, size] = $icon(props);

    return (
        <svg width={size} height={size} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M5.93555 16.7812H9.03934C9.09208 18.2126 10.2673 19.5385 12 19.5385C13.7252 19.5385 14.9079 18.2277 14.9682 16.7812H18.0645C18.8479 16.7812 19.3301 16.3518 19.3301 15.7039C19.3301 14.8979 18.5993 14.2123 17.9138 13.5569C17.3789 13.0371 17.2508 11.9975 17.1529 10.9353C17.0474 8.09513 16.2112 6.19669 14.2525 5.48854C13.9587 4.48659 13.1225 3.72571 12 3.72571C10.8775 3.72571 10.0413 4.48659 9.75502 5.48854C7.78878 6.19669 6.9601 8.09513 6.8471 10.9353C6.74916 11.9975 6.62109 13.0371 6.08622 13.5569C5.40067 14.2123 4.66992 14.8979 4.66992 15.7039C4.66992 16.3518 5.15206 16.7812 5.93555 16.7812ZM6.50809 15.38V15.2896C6.70396 15.0711 7.1409 14.6719 7.51004 14.25C8.02986 13.6548 8.27093 12.5549 8.34626 11.1236C8.43666 8.10266 9.37081 7.08564 10.5762 6.7617C10.7645 6.70897 10.8624 6.61857 10.8775 6.41516C10.9152 5.65428 11.3446 5.142 12 5.142C12.6629 5.142 13.0848 5.65428 13.1225 6.41516C13.1376 6.61857 13.243 6.70897 13.4238 6.7617C14.6367 7.08564 15.5633 8.10266 15.6537 11.1236C15.7366 12.5549 15.9777 13.6548 16.49 14.25C16.8591 14.6719 17.281 15.0711 17.4768 15.2896V15.38H6.50809ZM12 18.3256C11.1487 18.3256 10.5385 17.7154 10.4858 16.7812H13.5218C13.4766 17.7079 12.8588 18.3256 12 18.3256Z' fill={color} />
        </svg>
    );
}