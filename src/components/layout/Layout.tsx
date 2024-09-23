import React from "react";
import { Header } from "@/components/layout/Header";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="container mx-auto p-4 max-w-6xl my-10">
      <Header title="My Task Manager" />
      <main>{children}</main>
    </div>
  );
};
