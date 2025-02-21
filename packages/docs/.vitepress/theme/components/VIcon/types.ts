export interface IconProps {
  /** Icon name to render */
  slug: string;
  /** Optional color variant */
  variant?: string;
  /** Scale the icon's font size */
  fontScale?: number;
  /** Flip horizontally */
  flipH?: boolean;
  /** Flip vertically */
  flipV?: boolean;
  /** Rotate by degrees */
  rotate?: number;
  /** Scale the icon */
  scale?: number;
  /** Shift horizontally (in 1/16em units) */
  shiftH?: number;
  /** Shift vertically (in 1/16em units) */
  shiftV?: number;
  /** Animation type */
  animation?: 'slide' | 'slide-v' | 'fade' | 'spin' | 'spin-reverse' | 'throb';
  /** Title for accessibility */
  title?: string;
  /** Custom style */
  // style?: Record<string, string>;
}