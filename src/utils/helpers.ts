import axios from "axios";
import type { GameMode, GameResult, GameStatus, Player } from "../features/game/types/game.types";

const BOARD_SIZE = 3;

export const getPlayerName = (player: Player, mode: GameMode) => {
  if (mode === "cpu") return player === "X" ? "You" : "Computer";
  return `Player ${player}`;
};

export const getStatus = (
  result: GameResult | null,
  currentPlayer: Player,
  mode: GameMode = "pvp"
): GameStatus => {
  if (result?.winner) {
    const name = getPlayerName(result.winner, mode);
    return { label: name === "You" ? "You win" : `${name} wins`, tone: "win" };
  }
  if (result) return { label: "It's a draw", tone: "draw" };
  if (mode === "cpu") {
    return currentPlayer === "X"
      ? { label: "Your turn", tone: "X" }
      : { label: "Computer is thinking…", tone: "O" };
  }
  return { label: `Player ${currentPlayer}'s turn`, tone: currentPlayer };
};

export const getCellPosition = (index: number) => ({
  row: Math.floor(index / BOARD_SIZE) + 1,
  col: (index % BOARD_SIZE) + 1,
});

export const getErrorMessage = (error: unknown, fallback = "Something went wrong.") => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? error.message ?? fallback;
  }
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return fallback;
};

export const handleError = (error: unknown, context?: string) => {
  if (import.meta.env.DEV) {
    console.error(context ? `[${context}]` : "[error]", getErrorMessage(error), error);
  }
};
