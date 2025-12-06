import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './index.css';
import App from './App.jsx'
import { ThemeModeProvider } from "./context/ThemeContext.jsx";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeModeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeModeProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
