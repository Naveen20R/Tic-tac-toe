import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useViewportScale } from "../../hooks/useViewportScale";

function Layout() {
  const scale = useViewportScale();

  return (
    <Box
      sx={{
        maxWidth: 1088,
        mx: "auto",
        px: { xs: 2, sm: 4 },
        py: 3,
        color: "text.primary",
        zoom: scale,
      }}
    >
      <Outlet />
    </Box>
  );
}

export default Layout;
