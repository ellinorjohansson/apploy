/// <reference types="vite/client" />

// Declare custom HTML elements for Digi icons
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'digi-icon-bookmark-outline': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'digi-icon-bookmark-solid': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}