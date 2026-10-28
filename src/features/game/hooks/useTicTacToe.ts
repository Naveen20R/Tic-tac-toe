import { useCallback, useEffect, useMemo, useState } from "react";
import { getBoard, getResult } from "../utils/gameLogic";
import { getComputerMove } from "../utils/computerPlayer";
import { getCellPosition } from "../../../utils/helpers";
import type { GameMode, GameToast, MoveEntry, Player, Scores } from "../types/game.types";

const COMPUTER_DELAY = 500;
const initialScores: Scores = { x: 0, o: 0, draws: 0 };

export function useTicTacToe() {
  const [mode, setMode] = useState<GameMode>("pvp");
  const [moves, setMoves] = useState<number[]>([]);
  const [scores, setScores] = useState<Scores>(initialScores);
  const [toast, setToast] = useState<GameToast>({ open: false, type: "reset" });
  const board = useMemo(() => getBoard(moves), [moves]);
  const result = useMemo(() => getResult(board), [board]);

  const currentPlayer: Player = moves.length % 2 === 0 ? "X" : "O";
  const isGameOver = result !== null;
  const isComputerTurn = mode === "cpu" && currentPlayer === "O" && !isGameOver;

  const commitMove = useCallback((prevMoves: number[], index: number) => {
    const nextMoves = [...prevMoves, index];
    setMoves(nextMoves);

    const nextResult = getResult(getBoard(nextMoves));
    if (!nextResult) return;

    setToast({ open: true, type: nextResult.winner ?? "draw" });

    setScores((s) => {
      if (nextResult.winner === "X") return { ...s, x: s.x + 1 };
      if (nextResult.winner === "O") return { ...s, o: s.o + 1 };
      return { ...s, draws: s.draws + 1 };
    });
  }, []);

  useEffect(() => {
    if (!isComputerTurn) return;
    const timer = setTimeout(() => commitMove(moves, getComputerMove(board)), COMPUTER_DELAY);
    return () => clearTimeout(timer);
  }, [isComputerTurn, moves, board, commitMove]);

  const play = (index: number) => {
    if (board[index] || isGameOver || isComputerTurn) return;
    commitMove(moves, index);
  };

  const undo = () => {
    if (isGameOver || moves.length === 0) return;
    const count = mode === "cpu" && moves.length % 2 === 0 ? 2 : 1;
    setMoves(moves.slice(0, -count));
  };

  const newGame = () => {
    setMoves([]);
    setToast({ open: true, type: "reset" });
  };

  const changeMode = (next: GameMode) => {
    if (next === mode) return;
    setMode(next);
    setMoves([]);
    setScores(initialScores);
  };

  const closeToast = () => setToast((t) => ({ ...t, open: false }));

  const resetScores = () => setScores(initialScores);

  const history: MoveEntry[] = moves.map((cell, i) => ({
    move: i + 1,
    player: i % 2 === 0 ? "X" : "O",
    ...getCellPosition(cell),
  }));

  return {
    mode,
    board,
    result,
    scores,
    history,
    currentPlayer,
    isComputerTurn,
    toast,
    canUndo: moves.length > 0 && !isGameOver,
    play,
    undo,
    newGame,
    resetScores,
    changeMode,
    closeToast,
  };
}
