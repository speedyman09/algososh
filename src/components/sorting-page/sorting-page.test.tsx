import { ElementStates } from "../../types/element-states";
import { bubbleSort, selectionSort } from "./utils";


const inputArr = [
  { value: 2, color: ElementStates.Default },
  { value: 0, color: ElementStates.Default },
  { value: 1, color: ElementStates.Default },
];
const outputArrIncrease = [
  { value: 0, color: ElementStates.Modified },
  { value: 1, color: ElementStates.Modified },
  { value: 2, color: ElementStates.Modified },
];
const outputArrDecrease = [
  { value: 2, color: ElementStates.Modified },
  { value: 1, color: ElementStates.Modified },
  { value: 0, color: ElementStates.Modified },
];

const setValue = jest.fn();
const setLoader = jest.fn();

describe.each([
  { direction: 'Increase', expected: outputArrIncrease },
  { direction: 'Decrease', expected: outputArrDecrease }
])('selectionSortArrFunc %s', ({ direction, expected }) => {
  test("пустой массив", async () => {
    const result = await selectionSort([], setValue, setLoader, direction === 'Decrease');
    expect(result).toEqual([]);
  });

  test("массив из одного элемента", async () => {
    const result = await selectionSort([{ value: 777, color: ElementStates.Default }], setValue, setLoader, direction === 'Decrease');
    expect(result).toEqual([{ value: 777, color: ElementStates.Modified }]);
  });

  test("массив из нескольких элементов", async () => {
    const result = await selectionSort(inputArr, setValue, setLoader, direction === 'Decrease');
    expect(result).toEqual(expected);
  });
});

describe.each([
  { direction: 'Increase', expected: outputArrIncrease },
  { direction: 'Decrease', expected: outputArrDecrease }
])('bubbleSortArrFunc %s', ({ direction, expected }) => {
  test("пустой массив", async () => {
    const result = await bubbleSort([], setValue, setLoader, direction === 'Decrease');
    expect(result).toEqual([]);
  });

   test("массив из одного элемента", async () => {
    const result = await bubbleSort([{ value: 777, color: ElementStates.Default }], setValue, setLoader, direction === 'Decrease');
    expect(result).toEqual([{ value: 777, color: ElementStates.Modified }]);
  }); 

  test("массив из нескольких элементов", async () => {
    const result = await bubbleSort(inputArr, setValue, setLoader, direction === 'Decrease');
    expect(result).toEqual(expected);
  });
});


