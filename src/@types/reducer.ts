import type { RootState } from "../store";

// Shape of the whole Redux state, derived from the store so it never drifts
export type ReducerProps = RootState;
