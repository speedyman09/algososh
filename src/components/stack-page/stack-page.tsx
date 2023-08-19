import React, { ChangeEvent, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { TElement } from "../../types/element";
import { ElementStates } from "../../types/element-states";
import { timeOut } from "../../utils/delay";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Stack } from "./class";
import style from "./stack-page.module.css";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [stack] = useState(new Stack<TElement>());
  const [renderArr, setRenderArr] = useState<TElement[]>([]);
  const [loaderAdd, setLoaderAdd] = useState(false);
  const [loaderDelete, setLoaderDelete] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  const handleClickPush = async () => {
    if (inputValue) {
      setLoaderAdd(true);
      stack.push({ value: inputValue, color: ElementStates.Changing });
      setRenderArr([...stack.getContainer()]);
      setInputValue("");
      await timeOut(SHORT_DELAY_IN_MS);
      stack.peak()!.color = ElementStates.Default;
      setRenderArr([...stack.getContainer()]);
      setLoaderAdd(false);
    }
  };

  const handleClickPop = async () => {
    setLoaderDelete(true);
    stack.peak()!.color = ElementStates.Changing;
    setRenderArr([...stack.getContainer()]);
    stack.pop();
    await timeOut(SHORT_DELAY_IN_MS);
    setRenderArr([...stack.getContainer()]);
    setLoaderDelete(false);
  };

  const handleClickClear = () => {
    stack.clear();
    setRenderArr([...stack.getContainer()]);
  };

  const getPosition = (index: number, arr: TElement[]): string => {
    if (index === arr.length - 1) {
      return "top";
    } else {
      return "";
    }
  };
  return (
    <SolutionLayout title="Стек">
      <div className={style.wrapper}>
        <Input
          type="text"
          isLimitText={true}
          maxLength={4}
          value={`${inputValue}`}
          onChange={handleChange}
          extraClass="mr-6"
        />

        <Button
          type="submit"
          onClick={handleClickPush}
          isLoader={loaderAdd}
          text="Добавить"
          disabled={loaderDelete || !inputValue}
          linkedList="small"
          extraClass={`mr-6 ${style.addBtn}`}
        />
        <Button
          data-cy="remove"
          onClick={handleClickPop}
          isLoader={loaderDelete}
          text="Удалить"
          disabled={loaderAdd || !renderArr.length}
          linkedList="small"
          extraClass={`mr-40 ${style.deleteBtn}`}
        />
        <Button
          type="reset"
          onClick={handleClickClear}
          text="Очистить"
          disabled={loaderDelete || loaderAdd || !renderArr.length}
          linkedList="small"
          extraClass={style.clearBtn}
        />
      </div>
      <ul className={style.stackWrapper}>
        {renderArr.map((item: TElement, index: number) => (
          <li key={index}>
            <Circle
              index={index}
              letter={item.value}
              state={item.color}
              head={getPosition(index, renderArr)}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
