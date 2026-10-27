import { useMemo, useState } from "react";
import { getBoard, getResult } from "../utils/gameLogic";
import { getCellPosition } from "../../../utils/helpers";
import type { GameToast, MoveEntry, Player, Scores } from "../types/game.types";

const initialScores: Scores = { x: 0, o: 0, draws: 0 };

export function useTicTacToe() {
  const [moves, setMoves] = useState<number[]>([]);
  const [scores, setScores] = useState<Scores>(initialScores);
  const [toast, setToast] = useState<GameToast>({ open: false, type: "reset" });

  const board = useMemo(() => getBoard(moves), [moves]);
  const result = useMemo(() => getResult(board), [board]);

  const currentPlayer: Player = moves.length % 2 === 0 ? "X" : "O";
  const isGameOver = result !== null;

  const play = (index: number) => {
    if (board[index] || isGameOver) return;

    const nextMoves = [...moves, index];
    setMoves(nextMoves);

    const nextResult = getResult(getBoard(nextMoves));
    if (!nextResult) return;

    setToast({ open: true, type: nextResult.winner ?? "draw" });

    setScores((s) => {
      if (nextResult.winner === "X") return { ...s, x: s.x + 1 };
      if (nextResult.winner === "O") return { ...s, o: s.o + 1 };
      return { ...s, draws: s.draws + 1 };
    });
  };

  const undo = () => {
    if (isGameOver || moves.length === 0) return;
    setMoves(moves.slice(0, -1));
  };

  const newGame = () => {
    setMoves([]);
    setToast({ open: true, type: "reset" });
  };

  const closeToast = () => setToast((t) => ({ ...t, open: false }));

  const resetScores = () => setScores(initialScores);

  const history: MoveEntry[] = moves.map((cell, i) => ({
    move: i + 1,
    player: i % 2 === 0 ? "X" : "O",
    ...getCellPosition(cell),
  }));

  return {
    board,
    result,
    scores,
    history,
    currentPlayer,
    toast,
    canUndo: moves.length > 0 && !isGameOver,
    play,
    undo,
    newGame,
    resetScores,
    closeToast,
  };
}
