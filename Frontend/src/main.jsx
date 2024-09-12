import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./Routes/Routes.jsx";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./utillities/Providers/AuthProvider.jsx";

import "react-toastify/dist/ReactToastify.css";
import Aos from "aos";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NetworkProvider } from "./Connection/NetworkProvider.jsx";

const queryClient = new QueryClient();

Aos.init();
ReactDOM.createRoot(document.getElementById("root")).render(
  <NetworkProvider>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </NetworkProvider>
);
