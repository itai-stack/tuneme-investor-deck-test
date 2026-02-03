import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

console.log("TuneMe Deck: Mounting application...");

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("TuneMe Deck Error: Could not find root element '#root'.");
}