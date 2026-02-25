/// <reference types="vite/client" />

import React from 'react';

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
          src?: string;
          alt?: string;
          'camera-controls'?: boolean;
          'interaction-prompt'?: string;
          'shadow-intensity'?: string;
          'environment-image'?: string;
          ar?: boolean;
          'ar-modes'?: string;
          class?: string;
          style?: React.CSSProperties;
        };
      }
    }
  }
}
