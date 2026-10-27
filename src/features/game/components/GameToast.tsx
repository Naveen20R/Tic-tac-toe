import { Box, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Mark from "../../../components/common/Mark";
import type { GameToast as GameToastState } from "../types/game.types";

interface Props {
  toast: GameToastState;
  onClose: () => void;
}

const AUTO_HIDE = 3500;

const MESSAGES = {
  X: "Player X wins.",
  O: "Player O wins.",
  draw: "It's a draw.",
  reset: "Game reset successfully.",
};

export default function GameToast({ toast, onClose }: Props) {
  const { open, type } = toast;
  const isWin = type === "X" || type === "O";

  const icon = isWin ? (
    <Mark player={type} size={16} animate={false} />
  ) : type === "draw" ? (
    <Box sx={{ display: "flex", gap: "2px" }}>
      <Mark player="X" size={11} animate={false} />
      <Mark player="O" size={11} animate={false} />
    </Box>
  ) : (
    <RestartAltIcon sx={{ fontSize: 18, color: "primary.main" }} />
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={AUTO_HIDE}
      onClose={(_, reason) => {
        if (reason !== "clickaway") onClose();
      }}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Box
        role="alert"
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          pl: 1.25,
          pr: 0.75,
          py: 0.75,
          borderRadius: "14px",
          fontWeight: 600,
          fontSize: "0.95rem",
          color: "text.primary",
          background: theme.palette.game.cell,
          border: `1px solid ${isWin ? theme.palette.game.winBorder : theme.palette.game.divider}`,
          boxShadow: theme.palette.game.cellShadowHover,
          backdropFilter: "blur(18px)",
        })}
      >
        <Box
          sx={(theme) => ({
            width: 34,
            height: 34,
            borderRadius: "10px",
            display: "grid",
            placeItems: "center",
            background: isWin
              ? theme.palette.game.winFill
              : type === "reset"
                ? theme.palette.game.xSoft
                : theme.palette.game.cellHover,
          })}
        >
          {icon}
        </Box>
        {MESSAGES[type]}
        <IconButton
          size="small"
          aria-label="Close"
          onClick={onClose}
          sx={(theme) => ({
            width: 28,
            height: 28,
            color: theme.palette.game.danger,
            background: theme.palette.game.dangerSoft,
            "&:hover": { background: theme.palette.game.dangerSoft, filter: "brightness(0.95)" },
          })}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
    </Snackbar>
  );
}
