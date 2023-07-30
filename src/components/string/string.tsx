import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./string.module.css";
import { TArray } from "./utils";

export const StringComponent: React.FC = () => {
  const [valueInput, setValueInput] = useState("");
  const [arrayLetters, setArrayLetters] = useState<Array<TArray>>([]);
  const [loading, setLoading] = useState(false);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.currentTarget.value);
  };

  const reverse = (arr: TArray[]) => {
    const n = Math.floor(arr.length / 2);

    if (arr.length % 2 == 0) {
      let i = 0;

      changeColor(arr, i, ElementStates.Changing);

      const interval = setInterval(() => {
        const temp = arr[arr.length - i - 1];
        arr[arr.length - i - 1] = arr[i];
        arr[i] = temp;

        changeColor(arr, i, ElementStates.Modified);

        if (i < n - 1) {
          i++;
          changeColor(arr, i, ElementStates.Changing);
        } else {
          clearInterval(interval);
          setLoading(false);
        }
      }, 1000);
    } else {
      let i = 0;

      changeColor(arr, i, ElementStates.Changing);

      const interval = setInterval(() => {
        const temp = arr[arr.length - i - 1];
        arr[arr.length - i - 1] = arr[i];
        arr[i] = temp;

        changeColor(arr, i, ElementStates.Modified);

        if (i < n) {
          i++;
          changeColor(arr, i, ElementStates.Changing);
        } else {
          clearInterval(interval);
          setLoading(false);
        }


      }, 1000);
    }



  };

  const changeColor = (arr: TArray[], i: number, color: ElementStates) => {
    arr[i].color = color;
    arr[arr.length - i - 1].color = color;
    const newArr: TArray[] = arr.concat();

    setArrayLetters(newArr);
  };

  const clickButton = () => {
    setLoading(true);
    const arr = valueInput
      .split("")
      .map((value) => ({ value, color: ElementStates.Default }));

    setArrayLetters(arr);
    setValueInput("");

    setTimeout(() => reverse(arr), 1000);
  };
  

  return (
    <SolutionLayout title="Строка">
      <div className={styles.stringbox}>
        <div className={styles.inputbox}>
          <div className={styles.input}>
            <Input max={11} onChange={onChange} value={valueInput}></Input>
          </div>
          <Button
            text="Развернуть"
            type="submit"
            onClick={clickButton}
            disabled={valueInput === "" || valueInput.length > 11}
            isLoader={loading}
          />
        </div>
        Максимум 11 символов
      </div>

      <ul className={styles.circles}>
        {arrayLetters.map((item, index) => (
          <li className={styles.circle} key={index}>
            <Circle letter={item.value} state={item.color} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
