import { useCallback } from "react";
import { handleError } from "../utils/helpers";

export const useErrorHandler = () => {
  return useCallback((error: unknown, context?: string) => handleError(error, context), []);
};
