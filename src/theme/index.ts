import { createTheme, type CSSObject, type PaletteMode } from "@mui/material/styles";
import { colors } from "./colors";

export const fontFamilyMono = '"JetBrains Mono", monospace';

interface CustomStyles {
  flex: CSSObject;
  justifyCenter: CSSObject;
  justifyBetween: CSSObject;
  justifyStart: CSSObject;
  alignCenter: CSSObject;
  alignEnd: CSSObject;
  directionRow: CSSObject;
  directionColumn: CSSObject;
  flexCenter: CSSObject;
  flexBetween: CSSObject;
  clickable: CSSObject;
  borderPrimary: CSSObject;
  borderSecondary: CSSObject;
  relative: CSSObject;
  absolute: CSSObject;
  fixed: CSSObject;
  noShadow: CSSObject;
  fw400: CSSObject;
  fw500: CSSObject;
  fw600: CSSObject;
  fw700: CSSObject;
  w100: CSSObject;
  h100: CSSObject;
  minH100: CSSObject;
  vw100: CSSObject;
  vh100: CSSObject;
  minVh100: CSSObject;
  overflowHidden: CSSObject;
  overflowAuto: CSSObject;
}

// Reusable styles :
const flex: CSSObject = { display: "flex" };
const justifyCenter: CSSObject = { justifyContent: "center" };
const justifyBetween: CSSObject = { justifyContent: "space-between" };
const justifyStart: CSSObject = { justifyContent: "start" };
const alignCenter: CSSObject = { alignItems: "center" };
const alignEnd: CSSObject = { alignItems: "end" };
const directionRow: CSSObject = { flexDirection: "row" };
const directionColumn: CSSObject = { flexDirection: "column" };

const borderPrimary: CSSObject = {
  border: "2px solid",
};

const borderSecondary: CSSObject = {
  border: "1px solid",
};

const relative: CSSObject = {
  position: "relative",
};

const absolute: CSSObject = {
  position: "absolute",
};

const fixed: CSSObject = {
  position: "fixed",
};

const noShadow: CSSObject = {
  boxShadow: "none",
};

const fw400: CSSObject = {
  fontWeight: 400,
};

const fw500: CSSObject = {
  fontWeight: 500,
};

const fw600: CSSObject = {
  fontWeight: 600,
};

const fw700: CSSObject = {
  fontWeight: 700,
};

const w100: CSSObject = {
  width: "100%",
};

const h100: CSSObject = {
  height: "100%",
};

const minH100: CSSObject = {
  minHeight: "100%",
};

const vw100: CSSObject = {
  width: "100vw",
};

const vh100: CSSObject = {
  height: "100vh",
};

const minVh100: CSSObject = {
  minHeight: "100vh",
};

const overflowHidden: CSSObject = {
  overflow: "hidden",
};

const overflowAuto: CSSObject = {
  overflow: "auto",
};

// Compositions :
const flexCenter: CSSObject = {
  ...flex,
  ...justifyCenter,
  ...alignCenter,
  ...directionColumn,
};

const flexBetween: CSSObject = {
  ...flex,
  ...justifyBetween,
  ...alignCenter,
};

// Button clikable animation :
const clickable: CSSObject = {
  cursor: "pointer",
  transition: "transform 0.12s ease, background-color 0.12s ease",
  "&:active": { transform: "scale(0.92)" },
};

declare module "@mui/material/styles" {
  interface Theme {
    customStyles: CustomStyles;
  }
  interface ThemeOptions {
    customStyles?: CustomStyles;
  }
}

const typography = {
  fontFamily: '"Outfit", sans-serif',
  h1: {
    fontSize: "2.5rem",
    fontWeight: 700,
  },
  button: {
    textTransform: "none" as const,
  },
};

export const getTheme = (mode: PaletteMode) => {
  const c = colors[mode];

  return createTheme({
    palette: {
      mode,
      primary: { main: c.x, contrastText: c.buttonText },
      secondary: { main: c.o },
      success: { main: c.winBorder },
      background: { default: c.bgBase, paper: c.card },
      text: { primary: c.textPrimary, secondary: c.textMuted },
      divider: c.divider,
      game: c,
    },
    typography,
    customStyles: {
      flex,
      justifyCenter,
      justifyBetween,
      justifyStart,
      alignCenter,
      alignEnd,
      directionRow,
      directionColumn,
      flexCenter,
      flexBetween,
      clickable,
      borderPrimary,
      borderSecondary,
      relative,
      absolute,
      fixed,
      noShadow,
      fw400,
      fw500,
      fw600,
      fw700,
      w100,
      h100,
      minH100,
      vw100,
      vh100,
      minVh100,
      overflowHidden,
      overflowAuto,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          "*": {
            margin: 0,
            padding: 0,
            boxSizing: "border-box",
            scrollbarWidth: "thin",
            scrollbarColor: `${c.textMuted} transparent`,
          },
          "*::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "*::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "*::-webkit-scrollbar-thumb": {
            background: c.textMuted,
            borderRadius: "8px",
          },
          body: {
            margin: 0,
            padding: 0,
            minHeight: "100vh",
            backgroundColor: c.bgBase,
            backgroundImage: `radial-gradient(circle at 90% 0%, ${c.bgGlowTop} 0%, transparent 45%), radial-gradient(circle at 60% 100%, ${c.bgGlowBottom} 0%, transparent 50%)`,
            backgroundAttachment: "fixed",
            transition: "background-color 0.3s ease",
          },
          p: {
            margin: 0,
            padding: 0,
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: 999,
            padding: "10px 26px",
            fontWeight: 500,
            fontSize: "0.9rem",
            transition:
              "transform 0.15s ease, box-shadow 0.2s ease, background-color 0.2s ease",
            "&:hover": { transform: "translateY(-2px)" },
            "&:active": { transform: "translateY(1px)" },
            "&.Mui-disabled": { transform: "none" },
          },
          contained: {
            boxShadow: c.cellShadow,
            "&:hover": { boxShadow: c.cellShadowHover },
            "&:active": { boxShadow: c.cellShadow },
          },
          outlined: {
            color: c.textPrimary,
            background: c.cell,
            borderColor: c.divider,
            boxShadow: c.cellShadow,
            "&:hover": {
              background: c.cellHover,
              borderColor: c.divider,
              boxShadow: c.cellShadowHover,
            },
            "&:active": { boxShadow: c.cellShadow },
            "&.Mui-disabled": {
              background: c.cell,
              borderColor: c.divider,
              boxShadow: c.cellShadow,
            },
          },
        },
      },
    },
  });
};
