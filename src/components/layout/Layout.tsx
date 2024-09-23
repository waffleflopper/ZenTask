import React from "react";
import { Header } from "@/components/layout/Header";
import { AuthForms } from "@/components/auth/AuthForms";
import { useAuthContext } from "@/contexts/AuthContext";
interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAuthContext();

  return (
    <div className="container mx-auto p-4 max-w-6xl my-10">
      <Header title="ZenTask" />
      {user ? (
        <main>{children}</main>
      ) : (
        <div className="mt-8">
          <AuthForms />
        </div>
      )}
    </div>
  );
};
