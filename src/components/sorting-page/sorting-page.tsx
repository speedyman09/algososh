import React, { ChangeEvent, useState } from "react";
import { Direction } from "../../types/direction";
import { TElementNumber } from "../../types/element";
import { getRandomArray } from "../../utils/random-generate";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./sorting-page.module.css";
import { bubbleSort, selectionSort } from "./utils";

export const SortingPage: React.FC = () => {
  const [renderArr, setRenderArr] = useState<TElementNumber[]>([]);
  const [radio, setRadio] = useState("selection");
  const [loaderIncrease, setLoaderIncrease] = useState(false);
  const [loaderDecrease, setLoaderDecrease] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRadio(e.target.value);
  };

  const handleClickSortIncrease = () => {
    if (radio === "selection") {
      selectionSort(renderArr, setRenderArr, setLoaderIncrease);
    } else {
      bubbleSort(renderArr, setRenderArr, setLoaderIncrease);
    }
  };
  const handleClickSortDecrease = () => {
    if (radio === "selection") {
      selectionSort(renderArr, setRenderArr, setLoaderDecrease, true);
    } else {
      bubbleSort(renderArr, setRenderArr, setLoaderDecrease, true);
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={style.wrapper}>
        <RadioInput
          label="Выбор"
          name="sort"
          value="selection"
          extraClass="pr-20"
          checked={radio === "selection" ? true : false}
          onChange={handleChange}
        />
        <RadioInput
          label="Пузырёк"
          name="sort"
          value="bubble"
          extraClass="pr-25"
          checked={radio === "bubble" ? true : false}
          onChange={handleChange}
        />
        <Button
          onClick={handleClickSortIncrease}
          isLoader={loaderIncrease}
          text="По возрастанию"
          disabled={loaderDecrease}
          linkedList="big"
          sorting={Direction.Descending}
          extraClass="mr-6"
        />
        <Button
          onClick={handleClickSortDecrease}
          isLoader={loaderDecrease}
          text="По убыванию"
          disabled={loaderIncrease}
          linkedList="big"
          sorting={Direction.Ascending}
          extraClass="mr-40"
        />
        <Button
          onClick={() => setRenderArr(getRandomArray(3, 18))}
          text="Новый массив"
          disabled={loaderDecrease || loaderIncrease}
          linkedList="big"
        />
      </div>
      <ul className={style.sortWrapper}>
        {!!renderArr?.length &&
          renderArr.map((item: TElementNumber, index: number) => (
            <li key={index}>
              <Column index={Number(item.value)} state={item.color} />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
