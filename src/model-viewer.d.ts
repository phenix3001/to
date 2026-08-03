import type { DetailedHTMLProps, HTMLAttributes } from 'react';

interface ModelViewerAttributes
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  src: string;
  poster?: string;
  alt?: string;
  'camera-controls'?: boolean;
  'camera-orbit'?: string;
  'auto-rotate'?: boolean;
  'shadow-intensity'?: string;
  exposure?: string;
  loading?: 'eager' | 'lazy';
  ref?: import('react').Ref<HTMLElement>;
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': ModelViewerAttributes;
    }
  }
}
