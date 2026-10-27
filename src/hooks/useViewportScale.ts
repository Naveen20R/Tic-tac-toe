import { useSyncExternalStore } from "react";

// Size of the reference design; the UI is built 1:1 at this viewport
const DESIGN_WIDTH = 1364;
const DESIGN_HEIGHT = 800;
const MAX_SCALE = 1.8;

const subscribe = (callback: () => void) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};

const getScale = () => {
  const scale = Math.min(
    window.innerWidth / DESIGN_WIDTH,
    window.innerHeight / DESIGN_HEIGHT
  );
  // never shrink below design size (small screens use the responsive layout instead)
  return Math.min(Math.max(scale, 1), MAX_SCALE);
};

/** Scale factor that keeps the layout the same proportion of the screen as the design */
export const useViewportScale = () => useSyncExternalStore(subscribe, getScale);
