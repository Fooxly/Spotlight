/// <reference types="react" />
import { Icons } from './constants/icons';
import { IconProps } from '../icons/line/_icon';
export declare function getLocalIcon(icon: typeof Icons[number]): ((props: IconProps) => JSX.Element) | undefined;
