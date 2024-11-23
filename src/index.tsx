import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./routes/Router";
import { ConfigProvider } from "antd";
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ConfigProvider theme={{ token: { colorPrimary: "#00b96b" } }}>
          <Router />
        </ConfigProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
