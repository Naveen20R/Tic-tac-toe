import { IconButton } from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { useThemeMode } from "../../../theme/useThemeMode";

export default function ThemeToggle() {
  const { mode, toggleMode } = useThemeMode();

  return (
    <IconButton
      onClick={toggleMode}
      aria-label={mode === "light" ? "Switch to dark theme" : "Switch to light theme"}
      sx={(theme) => ({
        width: 46,
        height: 46,
        color: "text.primary",
        background: theme.palette.game.card,
        border: `1px solid ${theme.palette.game.cardBorder}`,
        "&:hover": { background: theme.palette.game.cellHover },
      })}
    >
      {mode === "light" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
    </IconButton>
  );
}
