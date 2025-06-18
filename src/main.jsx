import React from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import { ModalProvider } from "./context/ModalProvider";
import { UserProvider } from "./context/UserProvider.jsx";
import App from "./App.jsx";
import "./index.css";

import { RefProvider } from "./context/RefProvider.jsx";
import CardClickedProvider from "./context/CardClickedProvider.jsx";
import { JournalProvider } from "./context/JournalProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ChakraProvider>
          <JournalProvider>
            <ModalProvider>
              <RefProvider>
                <CardClickedProvider>
                  <App className="yusei-magic-regular" />
                </CardClickedProvider>
              </RefProvider>
            </ModalProvider>
          </JournalProvider>
        </ChakraProvider>
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
