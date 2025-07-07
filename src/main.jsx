import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import 'leaflet/dist/leaflet.css';

import "@fortawesome/fontawesome-free/css/all.min.css";
import { HashRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <AuthProvider>
    <App />
  </AuthProvider>
  </HashRouter>
);
