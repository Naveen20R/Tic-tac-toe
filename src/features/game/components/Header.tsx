import { Box, Typography, useTheme } from "@mui/material";
import { useOnlineStatus } from "../../../hooks/useOnlineStatus";
import BlinkDot from "../../../components/common/BlinkDot";
import Logo from "../../../components/common/Logo";
import ThemeToggle from "../../../components/common/ThemeToggle";

function OnlineStatus() {
  const isOnline = useOnlineStatus();
  const theme = useTheme();

  return (
    <Box
      role="status"
      sx={(theme) => ({
        display: "flex",
        alignItems: "center",
        gap: 1,
        px: 1.75,
        height: 46,
        borderRadius: 999,
        fontSize: "0.85rem",
        fontWeight: 500,
        color: "text.secondary",
        background: theme.palette.game.card,
        border: `1px solid ${theme.palette.game.cardBorder}`,
      })}
    >
      <BlinkDot color={isOnline ? theme.palette.game.winBorder : theme.palette.error.main} size={8} />
      {isOnline ? "Online" : "Offline"}
    </Box>
  );
}

export default function Header() {
  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 2,
        mb: 3,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.75 }}>
        <Logo />
        <Box>
          <Typography
            component="h1"
            sx={{ fontSize: "1.65rem", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em" }}
          >
            Tic-Tac-Toe
          </Typography>
          <Typography sx={{ fontSize: "0.85rem", fontWeight: 500, color: "text.secondary" }}>
            A classic game of Xs and Os.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1.5 }}>
        <OnlineStatus />
        <ThemeToggle />
      </Box>
    </Box>
  );
}
