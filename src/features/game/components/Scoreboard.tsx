import { Box, Button, Typography } from "@mui/material";
import GlassCard from "../../../components/common/GlassCard";
import type { GameMode, Scores } from "../types/game.types";

interface Props {
  scores: Scores;
  mode: GameMode;
  onReset: () => void;
}

export default function Scoreboard({ scores, mode, onReset }: Props) {
  const tiles = [
    { label: mode === "cpu" ? "You (X)" : "X wins", value: scores.x, color: "game.x" },
    { label: mode === "cpu" ? "Computer (O)" : "O wins", value: scores.o, color: "game.o" },
    { label: "Draws", value: scores.draws, color: "text.primary" },
  ];
  const hasScores = scores.x + scores.o + scores.draws > 0;

  return (
    <GlassCard component="section" aria-labelledby="scoreboard-title">
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Typography id="scoreboard-title" component="h2" sx={{ fontSize: "1.1rem", fontWeight: 700 }}>
          Scoreboard
        </Typography>
        <Button
          variant="text"
          size="small"
          onClick={onReset}
          disabled={!hasScores}
          sx={{ color: "text.secondary", p: "4px 8px", fontSize: "0.8rem" }}
        >
          Reset scores
        </Button>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1.25 }}>
        {tiles.map(({ label, value, color }) => (
          <Box
            key={label}
            sx={(theme) => ({
              textAlign: "center",
              py: 2,
              borderRadius: "16px",
              background: theme.palette.game.cell,
              border: `1px solid ${theme.palette.game.divider}`,
            })}
          >
            <Typography sx={{ fontSize: "1.9rem", fontWeight: 700, lineHeight: 1.2, color }}>
              {value}
            </Typography>
            <Typography sx={{ fontSize: "0.82rem", fontWeight: 500, color: "text.secondary" }}>
              {label}
            </Typography>
          </Box>
        ))}
      </Box>
    </GlassCard>
  );
}
