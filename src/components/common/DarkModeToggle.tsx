import React, { useEffect } from "react";
import { useUI } from "@/hooks/useUI";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DarkModeToggle: React.FC<{ className?: string }> = ({ className }) => {
  const { setDarkMode, uiState } = useUI();

  useEffect(() => {
    const root = window.document.documentElement;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (
      uiState.darkMode === "dark" ||
      (uiState.darkMode === "system" && prefersDark)
    ) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [uiState.darkMode]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={className}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setDarkMode("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setDarkMode("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setDarkMode("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DarkModeToggle;
