import { getResult } from "./gameLogic";
import type { Cell, GameResult, Player } from "../types/game.types";

const COMPUTER: Player = "O";
const HUMAN: Player = "X";
const WIN_SCORE = 10;

const getEmptySquares = (board: Cell[]): number[] => {
  const emptySquares: number[] = [];
  for (let squareIndex = 0; squareIndex < board.length; squareIndex++) {
    if (board[squareIndex] === null) {
      emptySquares.push(squareIndex);
    }
  }
  return emptySquares;
};

const placeMarkOnCopy = (board: Cell[], squareIndex: number, player: Player): Cell[] => {
  const newBoard = [...board];
  newBoard[squareIndex] = player;
  return newBoard;
};

const getOtherPlayer = (player: Player): Player => {
  return player === COMPUTER ? HUMAN : COMPUTER;
};

const scoreFinishedGame = (gameResult: GameResult, movesAhead: number): number => {
  if (gameResult.winner === COMPUTER) return WIN_SCORE - movesAhead;
  if (gameResult.winner === HUMAN) return movesAhead - WIN_SCORE;
  return 0;
};

const getMoveScore = (board: Cell[], playerToMove: Player, movesAhead: number): number => {
  const gameResult = getResult(board);
  if (gameResult) {
    return scoreFinishedGame(gameResult, movesAhead);
  }

  const possibleScores: number[] = [];
  for (const squareIndex of getEmptySquares(board)) {
    const boardAfterMove = placeMarkOnCopy(board, squareIndex, playerToMove);
    const score = getMoveScore(boardAfterMove, getOtherPlayer(playerToMove), movesAhead + 1);
    possibleScores.push(score);
  }

  if (playerToMove === COMPUTER) {
    return Math.max(...possibleScores);
  }
  return Math.min(...possibleScores);
};

export const getComputerMove = (board: Cell[]): number => {
  let bestSquare = -1;
  let bestScore = -Infinity;

  for (const squareIndex of getEmptySquares(board)) {
    const boardAfterMove = placeMarkOnCopy(board, squareIndex, COMPUTER);
    const score = getMoveScore(boardAfterMove, HUMAN, 1);

    if (score > bestScore) {
      bestScore = score;
      bestSquare = squareIndex;
    }
  }

  return bestSquare;
};
