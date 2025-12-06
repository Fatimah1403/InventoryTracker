import React, { createContext, useState, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext();


export function ThemeModeProvider({ children }) {
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                background: { default: "#F5F7FA" },
                primary: { main: "#4A6B7C" },
              }
            : {
                background: { default: "#121212", paper: "#1E1E1E" },
                primary: { main: "#90caf9" },
              }),
        },
        typography: {
          fontFamily: "Inter, Roboto, sans-serif",
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleMode, theme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
export default ThemeContext;

