import { Box } from "@mui/material";

export default function Logo({ size = 46 }: { size?: number }) {
  return (
    <Box
      sx={(theme) => ({
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius: `${Math.round(size * 0.3)}px`,
        display: "grid",
        placeItems: "center",
        background: `linear-gradient(135deg, ${theme.palette.game.logoFrom}, ${theme.palette.game.logoTo})`,
        boxShadow: `0 10px 22px -8px ${theme.palette.game.logoFrom}`,
      })}
    >
      <Box component="svg" viewBox="0 0 40 40" sx={{ width: "65%", height: "65%" }} aria-hidden>
        <g stroke="#ffffff" strokeWidth={3.2} strokeLinecap="round">
          <line x1="9" y1="9" x2="18" y2="18" />
          <line x1="18" y1="9" x2="9" y2="18" />
        </g>
        <Box
          component="circle"
          cx="25"
          cy="26"
          r="5.5"
          fill="none"
          strokeWidth={3.2}
          sx={(theme) => ({ stroke: theme.palette.game.logoRing })}
        />
      </Box>
    </Box>
  );
}
