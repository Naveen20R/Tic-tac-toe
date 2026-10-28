import { Box, useTheme } from "@mui/material";
import BlinkDot from "../../../components/common/BlinkDot";
import type { StatusTone } from "../types/game.types";

interface Props {
  label: string;
  tone: StatusTone;
}

export default function StatusChip({ label, tone }: Props) {
  const theme = useTheme();
  const dotColor = {
    X: theme.palette.game.x,
    O: theme.palette.game.o,
    win: theme.palette.game.winBorder,
    draw: theme.palette.text.secondary,
  }[tone];

  return (
    <Box
      role="status"
      aria-live="polite"
      sx={(theme) => ({
        display: "inline-flex",
        alignItems: "center",
        gap: 1.25,
        px: 2.25,
        py: 1.1,
        borderRadius: 999,
        fontSize: "0.95rem",
        fontWeight: 600,
        background: theme.palette.game.cell,
        border: `1px solid ${theme.palette.game.divider}`,
      })}
    >
      <BlinkDot color={dotColor} blinking={tone === "X" || tone === "O"} />
      {label}
    </Box>
  );
}
