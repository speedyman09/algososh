import { ElementStates } from "../../types/element-states";

export 
type TArray = {
  value: string | undefined | null;
  color: ElementStates;
  tail?: string;
  head?: string;
};

export const initialArr = Array.from({ length: 7 }, () => ({
  value: "",
  color: ElementStates.Default,
}));
