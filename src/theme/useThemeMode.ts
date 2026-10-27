import { useAppDispatch } from "../store";
import { useThemeData } from "../utils/storeData";
import { toggleTheme } from "../store/common/themeSwitcher.reducer";

export const useThemeMode = () => {
  const { mode } = useThemeData();
  const dispatch = useAppDispatch();

  return { mode, toggleMode: () => dispatch(toggleTheme()) };
};
