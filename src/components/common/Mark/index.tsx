import { Box, useTheme } from "@mui/material";
import { keyframes } from "@emotion/react";
import type { Player } from "../../../features/game/types/game.types";

const pop = keyframes`
  from { transform: scale(0.4); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

interface Props {
  player: Player;
  size?: number | string;
  animate?: boolean;
}

export default function Mark({ player, size = "46%", animate = true }: Props) {
  const theme = useTheme();
  const color = player === "X" ? theme.palette.game.x : theme.palette.game.o;

  return (
    <Box
      component="svg"
      viewBox="0 0 100 100"
      aria-hidden
      sx={{
        width: size,
        height: size,
        display: "block",
        animation: animate ? `${pop} 0.25s ease-out` : "none",
      }}
    >
      {player === "X" ? (
        <g stroke={color} strokeWidth={12} strokeLinecap="round">
          <line x1="22" y1="22" x2="78" y2="78" />
          <line x1="78" y1="22" x2="22" y2="78" />
        </g>
      ) : (
        <circle cx="50" cy="50" r="28" fill="none" stroke={color} strokeWidth={12} />
      )}
    </Box>
  );
}
