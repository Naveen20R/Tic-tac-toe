import "@mui/material/styles";
import type { GameColors } from "./colors";

declare module "@mui/material/styles" {
  interface Palette {
    game: GameColors;
  }

  interface PaletteOptions {
    game?: GameColors;
  }
}
