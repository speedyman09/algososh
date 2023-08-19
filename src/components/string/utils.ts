import { DELAY_IN_MS } from "../../constants/delays";
import { TElement } from "../../types/element";
import { ElementStates } from "../../types/element-states";
import { timeOut } from "../../utils/delay";

const swap = (arr: TElement[], i: number, j: number) =>
  ([arr[i], arr[j]] = [arr[j], arr[i]]);

export const stringToArr = (value: string, modified: boolean) =>
  value.split("").map((value: string) => {
    return { value, color: modified ? ElementStates.Modified : ElementStates.Default };
  });

export const expandString = async (
  value: TElement[],
  setValue: any,
  setLoader: any
) => {
  setLoader(true);
  const mid = Math.ceil(value.length / 2);

  for (let i = 0; i < mid; i++) {
    let j = value.length - 1 - i;

    if (i !== j) {
      value[i].color = ElementStates.Changing;
      value[j].color = ElementStates.Changing;
      setValue([...value]);
      await timeOut(DELAY_IN_MS);
    }

    swap(value, i, j);

    value[i].color = ElementStates.Modified;
    value[j].color = ElementStates.Modified;

    setValue([...value]);
  }
  setLoader(false);
  return value
};
