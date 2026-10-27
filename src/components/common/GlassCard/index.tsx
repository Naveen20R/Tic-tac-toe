import { Box, type BoxProps } from "@mui/material";

export default function GlassCard({ sx, ...props }: BoxProps) {
  return (
    <Box
      {...props}
      sx={[
        (theme) => ({
          background: theme.palette.game.card,
          border: `1px solid ${theme.palette.game.cardBorder}`,
          borderRadius: "24px",
          boxShadow: theme.palette.game.shadow,
          backdropFilter: "blur(18px)",
          p: { xs: 2.5, sm: 3.5 },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
}
