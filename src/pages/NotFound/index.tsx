import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import GlassCard from "../../components/common/GlassCard";
import Logo from "../../components/common/Logo";
import ThemeToggle from "../../components/common/ThemeToggle";
import Mark from "../../components/common/Mark";
import { useViewportScale } from "../../hooks/useViewportScale";
import type { Player } from "../../features/game/types/game.types";

type DemoCell = Player | "?" | "faded" | null;
const DEMO_BOARD: DemoCell[] = ["X", "O", "?", "O", "X", null, null, "faded", "X"];

function BigO() {
  return (
    <Box
      component="svg"
      viewBox="0 0 100 100"
      aria-hidden
      sx={(theme) => ({
        width: "0.78em",
        height: "0.78em",
        mx: "0.02em",
        stroke: theme.palette.game.o,
      })}
    >
      <circle cx="50" cy="50" r="40" fill="none" strokeWidth={17} />
    </Box>
  );
}

function DemoBoard() {
  return (
    <GlassCard aria-hidden sx={{ p: { xs: 2, sm: 3 }, width: "100%", maxWidth: 420 }}>
      <Box
        sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: { xs: 1, sm: 1.25 } }}
      >
        {DEMO_BOARD.map((cell, index) => {
          const isQuestion = cell === "?";
          return (
            <Box
              key={index}
              sx={(theme) => ({
                aspectRatio: "1",
                display: "grid",
                placeItems: "center",
                borderRadius: { xs: "14px", sm: "18px" },
                background: theme.palette.game.cell,
                border: isQuestion
                  ? `3px dashed ${theme.palette.game.x}`
                  : `1px solid ${theme.palette.game.divider}`,
                boxShadow: isQuestion ? "none" : theme.palette.game.cellShadow,
              })}
            >
              {cell === "X" || cell === "O" ? (
                <Mark player={cell} size="56%" animate={false} />
              ) : cell === "faded" ? (
                <Box
                  sx={{
                    opacity: 0.35,
                    width: "100%",
                    height: "100%",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <Mark player="O" size="56%" animate={false} />
                </Box>
              ) : isQuestion ? (
                <Typography
                  sx={(theme) => ({
                    fontSize: { xs: "2rem", sm: "2.8rem" },
                    fontWeight: 800,
                    lineHeight: 1,
                    color: theme.palette.game.x,
                  })}
                >
                  ?
                </Typography>
              ) : null}
            </Box>
          );
        })}
      </Box>
    </GlassCard>
  );
}

function NotFound() {
  const navigate = useNavigate();
  const scale = useViewportScale();

  const container = {
    width: "100%",
    maxWidth: 1088,
    mx: "auto",
    px: { xs: 2, sm: 4 },
    zoom: scale,
  };

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        color: "text.primary",
      }}
    >
      <title>Page not found | Tic-Tac-Toe</title>
      <meta name="robots" content="noindex, follow" />
      <Box
        component="header"
        sx={{
          ...container,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          pt: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Logo size={42} />
          <Typography sx={{ fontSize: "1.2rem", fontWeight: 700, letterSpacing: "-0.01em" }}>
            Tic-Tac-Toe
          </Typography>
        </Box>
        <ThemeToggle />
      </Box>

      <Box component="main" sx={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            ...container,
            display: "grid",
            gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "minmax(0, 1.1fr) minmax(0, 1fr)" },
            alignItems: "center",
            gap: 4,
            py: 3,
          }}
        >
          <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
            <Typography
              component="p"
              role="img"
              aria-label="Error 404"
              sx={(theme) => ({
                display: "inline-flex",
                alignItems: "center",
                fontSize: { xs: "6.5rem", sm: "9.5rem" },
                fontWeight: 800,
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
                color: theme.palette.game.x,
                mb: 3,
              })}
            >
              4<BigO />4
            </Typography>

            <Typography
              component="h1"
              sx={{
                fontSize: { xs: "1.7rem", sm: "2.4rem" },
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                mb: 2,
              }}
            >
              This move isn’t on the board
            </Typography>

            <Typography
              sx={{
                fontSize: "1.05rem",
                lineHeight: 1.6,
                color: "text.secondary",
                maxWidth: 420,
                mx: { xs: "auto", md: 0 },
                mb: 4,
              }}
            >
              The page you’re looking for doesn’t exist or has moved. Head back to the game and take
              your turn.
            </Typography>

            <Box
              sx={{ display: "flex", gap: 1.5, justifyContent: { xs: "center", md: "flex-start" } }}
            >
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardRoundedIcon />}
                onClick={() => navigate("/")}
                sx={{
                  "& .MuiButton-endIcon": { transition: "transform 0.2s ease" },
                  "&:hover .MuiButton-endIcon": { transform: "translateX(3px)" },
                }}
              >
                Back to game
              </Button>
            </Box>
          </Box>

          <Box
            sx={{ display: { xs: "none", md: "flex" }, justifyContent: "flex-end", width: "100%" }}
          >
            <DemoBoard />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default NotFound;
