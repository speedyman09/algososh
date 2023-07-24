import { ElementStates } from "../../types/element-states";

export type TArray = {
  value: string;
  color: ElementStates;
  tail?: string;
  head?: string;
};

export type TDownCircle = {
  value: string;
  index: number | null;
};


export const defaultArray = [
  {
    value: "1",
    color: ElementStates.Default,
  },
  {
    value: "13",
    color: ElementStates.Default,
  },
  {
    value: "4",
    color: ElementStates.Default,
  },
  {
    value: "18",
    color: ElementStates.Default,
  }
]