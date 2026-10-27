import axios from "axios";
import type { GameResult, GameStatus, Player } from "../features/game/types/game.types";

const BOARD_SIZE = 3;

/** Text and dot colour for the status chip */
export const getStatus = (result: GameResult | null, currentPlayer: Player): GameStatus => {
  if (result?.winner) return { label: `Player ${result.winner} wins`, tone: "win" };
  if (result) return { label: "It's a draw", tone: "draw" };
  return { label: `Player ${currentPlayer}'s turn`, tone: currentPlayer };
};

/** 1-based row and column for a board index (0–8) */
export const getCellPosition = (index: number) => ({
  row: Math.floor(index / BOARD_SIZE) + 1,
  col: (index % BOARD_SIZE) + 1,
});

/** Readable message from anything thrown (axios error, Error, string, …) */
export const getErrorMessage = (error: unknown, fallback = "Something went wrong.") => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? error.message ?? fallback;
  }
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return fallback;
};

/** Central place for caught errors; logs in development only */
export const handleError = (error: unknown, context?: string) => {
  if (import.meta.env.DEV) {
    console.error(context ? `[${context}]` : "[error]", getErrorMessage(error), error);
  }
};
