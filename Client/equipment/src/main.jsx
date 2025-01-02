import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import EquipmentProvider from "./contexts/EquipmentContext.jsx";
import SmallScreenProvider from "./contexts/SmallScreenContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <EquipmentProvider>
        <SmallScreenProvider>
          <App />
        </SmallScreenProvider>
      </EquipmentProvider>
    </AuthProvider>
  </StrictMode>
);
