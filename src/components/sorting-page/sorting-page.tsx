import React, { useState } from "react";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./sorting.module.css";
import { randomArr, TArray } from "./utils";

export const SortingPage: React.FC = () => {
  const [methodSorting, setMethodSorting] = useState("selection");

  const [array, setArray] = useState<Array<TArray>>(randomArr);

  const bubbleSort = (direction: boolean) => {
    let i = 0;
    let j = 0;

    let newArr = array.concat();
    newArr.map((item) => {
      item.color = ElementStates.Default;
    });

    const interval = setInterval(function () {
      newArr = newArr.concat();

      newArr[j].color = ElementStates.Changing;
      newArr[j + 1].color = ElementStates.Changing;

      setArray(newArr);
      setTimeout(function () {
        if (direction == true) {
          if (newArr[j].value > newArr[j + 1].value) {
            let temp = newArr[j];
            newArr[j] = newArr[j + 1];
            newArr[j + 1] = temp;
          }
        } else {
          if (newArr[j].value < newArr[j + 1].value) {
            let temp = newArr[j];
            newArr[j] = newArr[j + 1];
            newArr[j + 1] = temp;
          }
        }

        newArr[j].color = ElementStates.Default;
        setArray(newArr);

        if (j < newArr.length - i - 2) {
          j++;
        } else {
          newArr[j + 1].color = ElementStates.Modified;
          setArray(newArr);

          i++;
          j = 0;
          if (i >= newArr.length) {
            setTimeout(function () {
              newArr = newArr.concat();
              newArr[j + 1].color = ElementStates.Modified;
              newArr[j].color = ElementStates.Modified;

              setArray(newArr);
              clearInterval(interval);
            }, 300);
          }
        }
      }, 500);
      document.addEventListener("click", () => clearInterval(interval));
    }, 500);
  };

  const selectionSort = (direction: boolean) => {
    let i = 0;
    let j = i + 1;

    let minIndex = i;

    let newArr = array.concat();
    newArr.map((item) => {
      item.color = ElementStates.Default;
    });

    setArray(newArr);

    const interval = setInterval(function () {
      newArr = newArr.concat();

      for (let k = i; k < newArr.length; k++) {
        newArr[k].color = ElementStates.Default;
      }

      newArr[j].color = ElementStates.Changing;
      newArr[minIndex].color = ElementStates.Changing;

      if (direction == true) {
        if (newArr[j].value < newArr[minIndex].value) {
          minIndex = j;
        }
      } else {
        if (newArr[j].value > newArr[minIndex].value) {
          minIndex = j;
        }
      }

      if (j < newArr.length - 1) {
        j++;
      } else {
        let temp = newArr[minIndex];
        newArr[minIndex] = newArr[i];
        newArr[i] = temp;
        newArr[i].color = ElementStates.Modified;
        i++;
        minIndex = i;
        j = i + 1;

        if (i >= newArr.length - 1) {
          newArr[i].color = ElementStates.Modified;
          clearInterval(interval);
        }
      }
      setArray(newArr);
      document.addEventListener("click", () => clearInterval(interval));
    }, 500);
  };

  const clickButtonUp = () => {
    if (methodSorting == "bubble") {
      bubbleSort(true);
    } else {
      selectionSort(true);
    }
  };

  const clickButtonDown = () => {
    if (methodSorting == "bubble") {
      bubbleSort(false);
    } else {
      selectionSort(false);
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.main}>
        <div className={styles.flex}>
          <RadioInput
            label={"Выбор"}
            checked={methodSorting === "selection"}
            onChange={() => setMethodSorting("selection")}
          />
          <RadioInput
            label={"Пузырек"}
            checked={methodSorting === "bubble"}
            onChange={() => setMethodSorting("bubble")}
          />
        </div>
        <div className={styles.flex}>
          <Button
            text="По возрастанию"
            type="submit"
            onClick={clickButtonUp}
            sorting={Direction.Ascending}
            disabled={array.length == 0}
          />

          <Button
            text="По убыванию"
            type="submit"
            onClick={clickButtonDown}
            sorting={Direction.Descending}
            disabled={array.length == 0}
          />
        </div>
        <div>
          <Button
            text="Новый массив"
            type="submit"
            onClick={() => {
              setArray(randomArr());
            }}
            //   disabled={}
          />
        </div>
      </div>
      <ul className={styles.columns}>
        {array.map((item, index) => (
          <li className={styles.column} key={index}>
            <Column index={item.value} state={item.color} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
