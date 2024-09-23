import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import type { ThemeMode, UIState, Theme } from "@/types"

const initialTheme: Theme = {
  primary: "#007bff",
  secondary: "#6c7ae0",
  accent: "#ff4500",
  background: "#f0f0f0",
  text: "#333",
  border: "#ddd",
  primaryDark: "#0056b3",
  secondaryDark: "#405de6",
  accentDark: "#e63900",
  backgroundDark: "#222",
  textDark: "#ddd",
  borderDark: "#444",
}

export const uiStateAtom = atomWithStorage<UIState>("uiState", {
  darkMode: "system",
  showCompleted: false,
  showOverdue: false,
})

export const themeAtom = atom<Theme>(initialTheme)

export const setDarkModeAtom = atom(null, (get, set, mode: ThemeMode) => {
  const currentState = get(uiStateAtom)
  set(uiStateAtom, { ...currentState, darkMode: mode })
})

export const toggleShowCompletedAtom = atom(null, (get, set) => {
  const currentState = get(uiStateAtom)
  set(uiStateAtom, {
    ...currentState,
    showCompleted: !currentState.showCompleted,
  })
})

export const toggleShowOverdueAtom = atom(null, (get, set) => {
  const currentState = get(uiStateAtom)
  set(uiStateAtom, {
    ...currentState,
    showOverdue: !currentState.showOverdue,
  })
})

export const updateThemeAtom = atom(
  null,
  (get, set, updates: Partial<Theme>) => {
    const currentTheme = get(themeAtom)
    set(themeAtom, { ...currentTheme, ...updates })
  },
)
