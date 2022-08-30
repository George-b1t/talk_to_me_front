import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import App from "./App";
import { AppProvider } from "./context/AppContext";
import { store } from "./context/redux/store";
import "./global.css";
import "react-toastify/dist/ReactToastify.css";
import { queryClient } from "./services/queryClient";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <ToastContainer
              theme="dark"
              progressStyle={{ background: "#fcba03" }}
            />
            <App />
          </Provider>
        </QueryClientProvider>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
