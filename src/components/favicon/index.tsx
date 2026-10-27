import { useEffect } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { useTheme } from "@mui/material";
import { GiTicTacToe } from "react-icons/gi";

// set favicon dynamically based on the current theme color
export default function Favicon() {
  const theme = useTheme();
  const color = theme.palette.game.x;

  useEffect(() => {
    const svg = renderToStaticMarkup(
      <GiTicTacToe color={color} size={64} xmlns="http://www.w3.org/2000/svg" />
    );
    const href = `data:image/svg+xml,${encodeURIComponent(svg)}`;

    let link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.type = "image/svg+xml";
    link.href = href;
  }, [color]);

  return null;
}
