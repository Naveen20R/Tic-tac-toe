import { Box } from "@mui/material";
import { keyframes } from "@emotion/react";

const blink = keyframes`
  0% { opacity: 1; box-shadow: 0 0 0 0 currentColor; }
  50% { opacity: 0.35; }
  70% { box-shadow: 0 0 0 6px transparent; }
  100% { opacity: 1; box-shadow: 0 0 0 0 transparent; }
`;

interface Props {
  color: string;
  blinking?: boolean;
  size?: number;
}

export default function BlinkDot({ color, blinking = true, size = 10 }: Props) {
  return (
    <Box
      aria-hidden
      sx={{
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius: "50%",
        color,
        background: "currentColor",
        animation: blinking ? `${blink} 1.4s ease-in-out infinite` : "none",
        "@media (prefers-reduced-motion: reduce)": { animation: "none" },
      }}
    />
  );
}
