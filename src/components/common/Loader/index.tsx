import { Backdrop, CircularProgress } from "@mui/material";
import { useLoaderData } from "../../../utils/storeData";

export default function Loader() {
  const { isVisible } = useLoaderData();

  return (
    <Backdrop
      open={isVisible}
      sx={(theme) => ({
        zIndex: theme.zIndex.modal + 1,
        background: theme.palette.game.card,
        backdropFilter: "blur(6px)",
      })}
    >
      <CircularProgress aria-label="Loading" color="primary" size={48} thickness={4.5} />
    </Backdrop>
  );
}
