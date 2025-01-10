import { darkTheme, lightTheme } from "@/lib/theme";
import {
  CssBaseline,
  ThemeProvider as MUIThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { ReactNode } from "react";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const darkMode = useMediaQuery("(prefers-color-scheme: dark)");
  return (
    <MUIThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
