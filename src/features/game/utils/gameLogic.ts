import type { Cell, GameResult } from "../types/game.types";

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const getBoard = (moves: number[]): Cell[] => {
  const board: Cell[] = Array(9).fill(null);
  moves.forEach((cell, i) => {
    return (board[cell] = i % 2 === 0 ? "X" : "O");
  });
  return board;
};

export const getResult = (board: Cell[]): GameResult | null => {
  for (const line of LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  return board.every(Boolean) ? { winner: null, line: [] } : null;
};
