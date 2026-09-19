import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// ── Chunk Load Error Recovery ──────────────────────────────────────────────
// Jab bhi koi lazy-loaded chunk (route JS file) load fail ho — e.g. after a
// new deployment invalidates old chunk hashes — React ke liye blank page
// dikhne ki bajaye, hum ek baar page reload karte hain.
// sessionStorage flag prevents infinite reload loops.
window.addEventListener('unhandledrejection', (event) => {
  const reason = event?.reason;
  const isChunkError =
    reason instanceof Error &&
    (reason.message?.includes('Failed to fetch dynamically imported module') ||
      reason.message?.includes('Importing a module script failed') ||
      reason.message?.includes('error loading dynamically imported module') ||
      reason.name === 'ChunkLoadError');

  if (isChunkError) {
    const reloadKey = 'chunk_reload_attempted';
    if (!sessionStorage.getItem(reloadKey)) {
      sessionStorage.setItem(reloadKey, '1');
      window.location.reload();
    }
  }
});

// Clear the reload flag on successful load (so future genuine errors can retry)
window.addEventListener('load', () => {
  sessionStorage.removeItem('chunk_reload_attempted');
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
