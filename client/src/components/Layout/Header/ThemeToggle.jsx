import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useThemeMode } from "../../../context/ThemeContext";

export default function ThemeToggle() {
  const theme = useTheme();
  const { mode, toggleMode } = useThemeMode();

  return (
    <Tooltip title={mode === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}>
      <IconButton color="inherit" onClick={toggleMode}>
        {theme.palette.mode === "light" ? <Brightness4 /> : <Brightness7 />}
      </IconButton>
    </Tooltip>
  );
}
