import { useSyncExternalStore } from "react";

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
  return Math.min(Math.max(scale, 1), MAX_SCALE);
};

export const useViewportScale = () => useSyncExternalStore(subscribe, getScale);
