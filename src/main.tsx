import { createRoot } from "react-dom/client";
import { Provider } from "jotai";
import { AuthProvider } from "@/contexts/AuthContext";
import App from "@/App.tsx";
import "@/index.css";

createRoot(document.getElementById("root")!).render(
  <Provider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Provider>
);
