import { Box, ButtonBase } from "@mui/material";
import type { GameMode } from "../types/game.types";

const MODES: { value: GameMode; label: string }[] = [
  { value: "pvp", label: "Two players" },
  { value: "cpu", label: "vs Computer" },
];

interface Props {
  mode: GameMode;
  onChange: (mode: GameMode) => void;
}

export default function ModeToggle({ mode, onChange }: Props) {
  return (
    <Box
      role="radiogroup"
      aria-label="Game mode"
      sx={(theme) => ({
        display: "flex",
        p: 0.5,
        height: 46,
        borderRadius: 999,
        background: theme.palette.game.card,
        border: `1px solid ${theme.palette.game.cardBorder}`,
      })}
    >
      {MODES.map(({ value, label }) => {
        const active = value === mode;
        return (
          <ButtonBase
            key={value}
            role="radio"
            aria-checked={active}
            onClick={() => onChange(value)}
            sx={(theme) => ({
              px: 2.25,
              borderRadius: 999,
              fontFamily: "inherit",
              fontSize: "0.85rem",
              fontWeight: 500,
              color: active ? theme.palette.primary.contrastText : theme.palette.text.secondary,
              background: active ? theme.palette.primary.main : "transparent",
              boxShadow: active ? theme.palette.game.cellShadow : "none",
              transition: "background 0.2s ease, color 0.2s ease",
              "&:hover": active ? {} : { color: theme.palette.text.primary },
            })}
          >
            {label}
          </ButtonBase>
        );
      })}
    </Box>
  );
}
