import React, { ChangeEvent, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./stack.module.css";
import { TArray } from "./utils";


export const StackPage: React.FC = () => {
  const [valueInput, setValueInput] = useState<string>("");
  const [array, setArray] = useState<TArray[]>([]);
  const [Addloading, setAddLoading] = useState(false);
  const [DelLoading, setDelLoading] = useState(false);
  const [ClearLoading, setClearLoading] = useState(false);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.currentTarget.value);
  };

  const clickButtonAdd = () => {
    setAddLoading(true);
    const arr = array.concat();
    arr.push({
      value: valueInput,
      color: ElementStates.Modified,
    });

    setArray(arr);

    setTimeout(() => {
      console.log(array);

      const newArr = arr.concat();
      const n = newArr.length - 1;

      newArr[n].color = ElementStates.Default;

      setArray(newArr);
      setAddLoading(false);
    }, 500);

    setValueInput("");

  };

  const clickButtonDel = () => {
    setDelLoading(true);
    const arr = array.concat();
    const n = arr.length - 1;

    arr[n].color = ElementStates.Modified;

    setArray(arr);

    setTimeout(() => {
      const newArr = arr.concat();
      newArr.pop();
      setArray(newArr);
      setDelLoading(false);
    }, 500);
  };

  const clickButtonClear = () => {
    setClearLoading(true)
    setArray([]);
    setClearLoading(false);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.stringbox}>
        <div className={styles.inputbox}>
          <div className={styles.input}>
            <Input max={11} onChange={onChange} value={valueInput} isLimitText maxLength={4}></Input>
          </div>
          <div>
            <Button
              text="Добавить"
              type="submit"
              onClick={clickButtonAdd}
              disabled={valueInput === "" || valueInput.length > 4}
              isLoader={Addloading}
            />
          </div>{" "}
          <div className={styles.btnDelete}>
            <Button
              text="Удалить"
              type="submit"
              onClick={clickButtonDel}
              disabled={array.length == 0}
              isLoader={DelLoading}
            />
          </div>{" "}
          <div>
            <Button
              text="Очистить"
              type="submit"
              onClick={clickButtonClear}
              disabled={array.length == 0}
              isLoader={ClearLoading}
            />
          </div>
        </div>
      </div>

      <ul className={styles.circles}>
        {array.map((item, index) => (
          <li className={styles.circle} key={index}>
            {index == array.length - 1 && <p>top</p>}
            <Circle letter={item.value} state={item.color} />
            <p>{index}</p>
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
