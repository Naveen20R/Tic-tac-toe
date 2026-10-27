import { useCallback } from "react";
import { handleError } from "../utils/helpers";

/**
 * Error handler for components. Use it in catch blocks:
 *   const onError = useErrorHandler();
 *   try { … } catch (error) { onError(error, "Saving scores"); }
 * Outside React (reducers, services) call handleError from utils/helpers instead.
 */
export const useErrorHandler = () => {
  return useCallback((error: unknown, context?: string) => handleError(error, context), []);
};
