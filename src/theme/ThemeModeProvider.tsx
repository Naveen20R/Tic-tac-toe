import { useEffect, useMemo, type ReactNode } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { getTheme } from ".";
import { useThemeData } from "../utils/storeData";
import { useErrorHandler } from "../hooks/useErrorHandler";
import { THEME_STORAGE_KEY } from "../store/common/themeSwitcher.reducer";

export default function ThemeModeProvider({ children }: { children: ReactNode }) {
  const { mode } = useThemeData();
  const onError = useErrorHandler();
  const theme = useMemo(() => getTheme(mode), [mode]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch (error) {
      onError(error, "Saving theme");
    }
  }, [mode, onError]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
}
