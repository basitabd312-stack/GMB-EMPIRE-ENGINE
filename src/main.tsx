// Safeguard window.fetch against read-only getter assignment
try {
  if (typeof window !== 'undefined' && window.fetch) {
    let _activeFetch = window.fetch.bind(window);
    Object.defineProperty(window, 'fetch', {
      get() {
        return _activeFetch;
      },
      set(fn) {
        _activeFetch = fn;
      },
      configurable: true,
      enumerable: true
    });
  }
} catch {
  // Ignore if already configurable
}

import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
