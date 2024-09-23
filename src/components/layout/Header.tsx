import React from "react";
import DarkModeToggle from "@/components/common/DarkModeToggle";

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="flex justify-between items-center mb-4">
      <h1 className="text-4xl font-bold text-primary">{title}</h1>
      <DarkModeToggle />
    </header>
  );
};
