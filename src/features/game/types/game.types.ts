export type Player = "X" | "O";
export type Cell = Player | null;

export interface GameResult {
  winner: Player | null;
  line: number[];
}

export interface Scores {
  x: number;
  o: number;
  draws: number;
}

export interface MoveEntry {
  move: number;
  player: Player;
  row: number;
  col: number;
}

export type ToastType = Player | "draw" | "reset";

export interface GameToast {
  open: boolean;
  type: ToastType;
}

export type StatusTone = Player | "win" | "draw";

export interface GameStatus {
  label: string;
  tone: StatusTone;
}
