import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { ThemeMode, UIState } from "@/types";

export const uiStateAtom = atomWithStorage<UIState>("uiState", {
  darkMode: "system",
  showCompleted: false,
  showOverdue: false,
});

export const setDarkModeAtom = atom(null, (get, set, mode: ThemeMode) => {
  const currentState = get(uiStateAtom);
  set(uiStateAtom, { ...currentState, darkMode: mode });
});

export const toggleShowCompletedAtom = atom(null, (get, set) => {
  const currentState = get(uiStateAtom);
  set(uiStateAtom, {
    ...currentState,
    showCompleted: !currentState.showCompleted,
  });
});

export const toggleShowOverdueAtom = atom(null, (get, set) => {
  const currentState = get(uiStateAtom);
  set(uiStateAtom, {
    ...currentState,
    showOverdue: !currentState.showOverdue,
  });
});
