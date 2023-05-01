import React from "react";
import ReactDOM from "react-dom/client";
import store from "./store/index.tsx";
import { StoreProvider } from "easy-peasy";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
