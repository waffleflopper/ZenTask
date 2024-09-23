import { useAtom } from "jotai";
import {
  uiStateAtom,
  setDarkModeAtom,
  toggleShowCompletedAtom,
  toggleShowOverdueAtom,
} from "@/store/uiAtoms";

export const useUI = () => {
  const [uiState] = useAtom(uiStateAtom);
  const [, setDarkMode] = useAtom(setDarkModeAtom);
  const [, toggleShowCompleted] = useAtom(toggleShowCompletedAtom);
  const [, toggleShowOverdue] = useAtom(toggleShowOverdueAtom);

  return {
    uiState,
    setDarkMode,
    toggleShowCompleted,
    toggleShowOverdue,
  };
};
