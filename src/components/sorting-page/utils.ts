import { ElementStates } from "../../types/element-states";

export type TArray = {
  value: number;
  color: ElementStates;
};

export const randomArr = () => {
  const arr = [];
  const length = Math.floor(Math.random() * 13) + 3;
  for (let i = 0; i < length; i++) {
    arr.push({
      value: Math.round(Math.random() * 100),
      color: ElementStates.Default,
    });
  }
  return arr;
};
