import { useEffect, useState, type CSSProperties } from "react";
import { Box, Button } from "@mui/material";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import CloseIcon from "@mui/icons-material/Close";

export default function NetworkConnection() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [visible, setVisible] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setVisible(true);
    };
    const handleOffline = () => {
      setIsOnline(false);
      setVisible(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!isOnline || !visible) return;

    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isOnline, visible]);

  return (
    <Box
      role="status"
      aria-live="polite"
      aria-hidden={!visible}
      sx={{
        ...style.offlineBanner,
        ...(visible ? (isOnline ? style.online : style.offline) : style.hide),
      }}
    >
      {isOnline ? (
        <>
          <CrisisAlertIcon sx={{ fontSize: 22, color: "green" }} />
          <span style={{ color: "#222831" }}>Connected to the internet</span>
        </>
      ) : (
        <>
          <CrisisAlertIcon sx={{ fontSize: 22, color: "#E52020" }} />
          <span style={{ color: "#222831" }}>
            No internet connection. Please check your connection.
          </span>
        </>
      )}

      {!isOnline && (
        <Button
          variant="contained"
          aria-label="Close"
          sx={{
            ...style.button,
            "& .MuiButton-endIcon": {
              marginLeft: 0,
              marginRight: 0,
            },
          }}
          endIcon={<CloseIcon />}
          onClick={() => setVisible(false)}
        />
      )}
    </Box>
  );
}

const style: { [key: string]: CSSProperties } = {
  offlineBanner: {
    position: "fixed",
    top: "-200px",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "10px 20px",
    borderRadius: "8px",
    zIndex: 9999,
    fontWeight: 500,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: "5px",
    transition: "top 0.6s ease, background 0.3s ease",
    color: "#222831",
  },
  offline: {
    top: "20px",
    background: "#ffde63",
  },
  online: {
    top: "20px",
    background: "#a8e6a1",
  },
  hide: {
    top: "-200px",
  },
  button: {
    padding: "2px",
    margin: "0px",
    width: "auto",
    minWidth: "auto",
    backgroundColor: "#222831",
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
  },
};
