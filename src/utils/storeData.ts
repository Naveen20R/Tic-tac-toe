import { useSelector } from "react-redux";
import type { ReducerProps } from "../@types/reducer";

export const useThemeData = () => {
  return useSelector((state: ReducerProps) => state.theme);
};

export const useLoaderData = () => {
  return useSelector((state: ReducerProps) => state.loader);
};
