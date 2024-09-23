import { useAtom } from "jotai"
import {
  uiStateAtom,
  themeAtom,
  setDarkModeAtom,
  toggleShowCompletedAtom,
  toggleShowOverdueAtom,
  updateThemeAtom,
} from "@/store/uiAtoms"

export const useUI = () => {
  const [uiState] = useAtom(uiStateAtom)
  const [theme] = useAtom(themeAtom)
  const [, setDarkMode] = useAtom(setDarkModeAtom)
  const [, toggleShowCompleted] = useAtom(toggleShowCompletedAtom)
  const [, toggleShowOverdue] = useAtom(toggleShowOverdueAtom)
  const [, updateTheme] = useAtom(updateThemeAtom)

  return {
    uiState,
    theme,
    setDarkMode,
    toggleShowCompleted,
    toggleShowOverdue,
    updateTheme,
  }
}
