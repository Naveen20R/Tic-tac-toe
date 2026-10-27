import type { PaletteMode } from "@mui/material";

export interface GameColors {
  bgBase: string;
  bgGlowTop: string;
  bgGlowBottom: string;
  card: string;
  cardBorder: string;
  cell: string;
  cellHover: string;
  tableHead: string;
  divider: string;
  textPrimary: string;
  textMuted: string;
  x: string;
  xSoft: string;
  o: string;
  oSoft: string;
  winFill: string;
  winBorder: string;
  danger: string;
  dangerSoft: string;
  buttonText: string;
  logoFrom: string;
  logoTo: string;
  logoRing: string;
  shadow: string;
  cellShadow: string;
  cellShadowHover: string;
}

const light: GameColors = {
  bgBase: "#eef0ff",
  bgGlowTop: "#e3f6f4",
  bgGlowBottom: "#fdeef6",
  card: "rgba(255, 255, 255, 0.72)",
  cardBorder: "rgba(255, 255, 255, 0.9)",
  cell: "#ffffff",
  cellHover: "#f6f4ff",
  tableHead: "#ffffff",
  divider: "rgba(80, 70, 160, 0.12)",
  textPrimary: "#2a2656",
  textMuted: "#7a76a3",
  x: "#6d5bf6",
  xSoft: "rgba(109, 91, 246, 0.14)",
  o: "#ffae2b",
  oSoft: "rgba(255, 174, 43, 0.2)",
  winFill: "#e9fbf3",
  winBorder: "#34c98f",
  danger: "#c62828",
  dangerSoft: "rgba(229, 57, 53, 0.12)",
  buttonText: "#ffffff",
  logoFrom: "#6d5bf6",
  logoTo: "#a78bfa",
  logoRing: "#ffd47a",
  shadow: "0 20px 50px -24px rgba(80, 70, 160, 0.35)",
  cellShadow:
    "0 10px 22px -10px rgba(80, 70, 160, 0.28), 0 2px 4px rgba(80, 70, 160, 0.06), inset 0 -3px 0 rgba(80, 70, 160, 0.05)",
  cellShadowHover:
    "0 16px 28px -10px rgba(80, 70, 160, 0.35), 0 3px 6px rgba(80, 70, 160, 0.08), inset 0 -3px 0 rgba(80, 70, 160, 0.05)",
};

const dark: GameColors = {
  bgBase: "#1d1b3a",
  bgGlowTop: "#16303a",
  bgGlowBottom: "#2a1f45",
  card: "rgba(255, 255, 255, 0.07)",
  cardBorder: "rgba(255, 255, 255, 0.12)",
  cell: "rgba(255, 255, 255, 0.08)",
  cellHover: "rgba(255, 255, 255, 0.14)",
  tableHead: "#3e3c56",
  divider: "rgba(255, 255, 255, 0.12)",
  textPrimary: "#f1efff",
  textMuted: "#a9a5d1",
  x: "#9b8cff",
  xSoft: "rgba(155, 140, 255, 0.2)",
  o: "#ffc15a",
  oSoft: "rgba(255, 193, 90, 0.22)",
  winFill: "rgba(52, 201, 143, 0.18)",
  winBorder: "#4fe0a8",
  danger: "#ff6b6b",
  dangerSoft: "rgba(255, 107, 107, 0.16)",
  buttonText: "#1d1b3a",
  logoFrom: "#6d5bf6",
  logoTo: "#a78bfa",
  logoRing: "#ffd47a",
  shadow: "0 20px 50px -24px rgba(0, 0, 0, 0.6)",
  cellShadow:
    "0 10px 22px -10px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
  cellShadowHover:
    "0 16px 28px -10px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
};

export const colors: Record<PaletteMode, GameColors> = { light, dark };
