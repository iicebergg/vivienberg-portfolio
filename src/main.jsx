import React from "react";
import { createRoot } from "react-dom/client";
import Portfolio from "./portfolio.jsx";
import { inject } from '@vercel/analytics';

inject();

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Portfolio />
  </React.StrictMode>
);