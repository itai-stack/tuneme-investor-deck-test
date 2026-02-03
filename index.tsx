
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

console.log("TuneMe Deck: Initializing...");

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("TuneMe Deck Error: Root element '#root' not found in index.html");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("TuneMe Deck: Rendered successfully.");
  } catch (err) {
    console.error("TuneMe Deck: Failed to render app:", err);
  }
}
