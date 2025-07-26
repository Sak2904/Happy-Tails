import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Correct import for React 18+
import App from "./App";
import "./styles.css"; // ✅ Ensure CSS is imported

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement); // ✅ Correct usage
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found!");
}
