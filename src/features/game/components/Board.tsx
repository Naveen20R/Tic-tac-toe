import { Box, ButtonBase } from "@mui/material";
import Mark from "../../../components/common/Mark";
import type { Cell } from "../types/game.types";
import { getCellPosition } from "../../../utils/helpers";

interface Props {
  board: Cell[];
  winningLine: number[];
  disabled: boolean;
  onCellClick: (index: number) => void;
}

export default function Board({ board, winningLine, disabled, onCellClick }: Props) {
  return (
    <Box
      role="group"
      aria-label="Game board"
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: { xs: 1.25, sm: 1.75 },
        width: "100%",
        maxWidth: 420,
        mx: "auto",
      }}
    >
      {board.map((cell, index) => {
        const isWinning = winningLine.includes(index);
        const { row, col } = getCellPosition(index);

        return (
          <ButtonBase
            key={index}
            disabled={disabled || cell !== null}
            onClick={() => onCellClick(index)}
            aria-label={`Row ${row}, Column ${col}${cell ? `, ${cell}` : ""}`}
            sx={(theme) => ({
              aspectRatio: "1",
              borderRadius: { xs: "16px", sm: "20px" },
              background: isWinning ? theme.palette.game.winFill : theme.palette.game.cell,
              border: `1px solid ${isWinning ? theme.palette.game.winBorder : theme.palette.game.divider}`,
              boxShadow: theme.palette.game.cellShadow,
              transition:
                "background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease",
              "&:hover": {
                background: theme.palette.game.cellHover,
                boxShadow: theme.palette.game.cellShadowHover,
                transform: "translateY(-3px)",
              },
              "&:active": {
                boxShadow: theme.palette.game.cellShadow,
                transform: "translateY(0)",
              },
            })}
          >
            {cell && <Mark player={cell} />}
          </ButtonBase>
        );
      })}
    </Box>
  );
}
