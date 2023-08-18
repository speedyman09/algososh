import { Dispatch, SetStateAction } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { TElementNumber } from "../../types/element";
import { ElementStates } from "../../types/element-states";
import { timeOut } from "../../utils/delay";
// СОРТИРОВКА ВЫБОРОМ
export const selectionSort =  async (
  arr: TElementNumber[],
  setArr: Dispatch<SetStateAction<TElementNumber[]>>,
  setLoader: Dispatch<SetStateAction<boolean>>,
  sortDown: boolean = false
) => {
  if(!arr.length) return []
  
  setLoader(true);
  setArr([...arr]);
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      arr[i].color = ElementStates.Changing;
      arr[j].color = ElementStates.Changing;
      setArr([...arr]);
      await timeOut(SHORT_DELAY_IN_MS); 
      if (
        sortDown
          ? arr[j].value > arr[minIndex].value
          : arr[j].value < arr[minIndex].value
      ) {
        minIndex = j;
      }
       arr[j].color = ElementStates.Default; 
     
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    arr[i].color = ElementStates.Modified;
  }
  arr[arr.length - 1].color = ElementStates.Modified;
  setArr([...arr]);
  setLoader(false);
  return arr
};

// СОРТИРОВКА ПУЗЫРЬКОМ
export const bubbleSort = async (
  arr: TElementNumber[],
  setArr: Dispatch<SetStateAction<TElementNumber[]>>,
  setLoader: Dispatch<SetStateAction<boolean>>,
  sortDown: boolean = false
) => {
  if(!arr.length) return []
  setLoader(true);
  setArr([...arr]);
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      arr[j].color = ElementStates.Changing;
      arr[j + 1].color = ElementStates.Changing;
      await timeOut(SHORT_DELAY_IN_MS);
      setArr([...arr]);

      if (
        sortDown
          ? arr[j].value < arr[j + 1].value
          : arr[j].value > arr[j + 1].value
      ) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
      arr[j].color = ElementStates.Default;
    }
    arr[arr.length - i - 1].color = ElementStates.Modified;
    setArr([...arr]);
  }
  setLoader(false);
  return arr
};

