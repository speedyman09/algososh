import React, { ChangeEvent, useMemo, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import LinkedList from "./list-class";

import styles from "./list.module.css";
import { TDownCircle, TArray, defaultArray } from "./utils";


export const ListPage: React.FC = () => {
  const list = useMemo(() => new LinkedList<string>(), []);

  const [valueInput, setValueInput] = useState<any>("");
  const [indexInput, setIndexInput] = useState<any>("");
  const [TailLoading, setTailLoading] = useState(false);
  const [HeadLoading, setHeadLoading] = useState(false);
  const [DeleteTailLoading, setDeleteTailLoading] = useState(false);
  const [DeleteHeadLoading, setDeleteHeadLoading] = useState(false);
  const [addByIndexLoading, setAddByIndexLoading] = useState(false);
  const [deleteByIndexLoading, setdeleteByIndexLoading] = useState(false);

  const [indexUpCircle, setIndexUpCircle] = useState<number | null>(null);
  const [indexDownCircle, setIndexDownCircle] = useState<TDownCircle>({
    value: "",
    index: null,
  });

  const [array, setArray] = useState<TArray[]>(defaultArray);

  const onChangeValueInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.currentTarget.value);
  };

  const onChangeIndexInput = (e: ChangeEvent<HTMLInputElement>) => {
    setIndexInput(e.currentTarget.value);
  };


  const clickButtonAddToHead = () => {
    setHeadLoading(true);
    setValueInput("");

    setIndexUpCircle(0);

    const newArray = array.concat();

    list.addToHead(valueInput);

    const newElement = {
      value: valueInput,
      color: ElementStates.Changing,
    };

    newArray.unshift(newElement);

    setArray(newArray);

    setTimeout(() => {
      setIndexUpCircle(null);

      const array = [...newArray];
      array[0].color = ElementStates.Default;
      setArray(array);
      setHeadLoading(false);
    }, 500);
  };

  const clickButtonAddToTail = () => {
    setTailLoading(true);
    setValueInput("");
    const newArray = array.concat();

    setIndexUpCircle(array.length);

    list.addToTail(valueInput);

    const newElement = {
      value: valueInput,
      color: ElementStates.Changing,
    };

    newArray.push(newElement);

    setArray(newArray);

    setTimeout(() => {
      setIndexUpCircle(null);

      const array = [...newArray];

      array[array.length - 1].color = ElementStates.Default;
      setArray(array);
      setTailLoading(false)
    }, 500);
  };

  const clickButtonDelHead = () => {
    setDeleteHeadLoading(true);
    const newArray = array.concat();
    const downCircle = {
      value: newArray[0].value,
      index: 0,
    };

    setIndexDownCircle(downCircle);

    list.delFromHead();

    newArray[0].value = "";
    newArray[0].color = ElementStates.Changing;

    setArray(newArray);

    setTimeout(() => {
      const downCircle = {
        value: "",
        index: null,
      };

      setIndexDownCircle(downCircle);
      const array = [...newArray];
      array.shift();

      setArray(array);
      setDeleteHeadLoading(false);
    }, 500);
  };

  const clickButtonDelTail = () => {
    setDeleteTailLoading(true)
    const newArray = array.concat();

    const downCircle = {
      value: newArray[newArray.length - 1].value,
      index: newArray.length - 1,
    };

    setIndexDownCircle(downCircle);

    list.delFromTail();

    newArray[newArray.length - 1].value = "";
    newArray[newArray.length - 1].color = ElementStates.Changing;

    setArray(newArray);

    setTimeout(() => {
      const downCircle = {
        value: "",
        index: null,
      };

      setIndexDownCircle(downCircle);
      const array = [...newArray];
      array.pop();

      setArray(array);
      setDeleteTailLoading(false);
    }, 500);
  };

  const clickButtonAddByIndex = () => {
    setAddByIndexLoading(true)
    const newArray = array.concat();

    setIndexUpCircle(indexInput);

    list.addByIndex(indexInput, valueInput);

    const newElement = {
      value: valueInput,
      color: ElementStates.Changing,
    };

    newArray.splice(indexInput, 0, newElement);

    setArray(newArray);

    setTimeout(() => {
      setIndexUpCircle(null);

      const array = [...newArray];
      array[indexInput].color = ElementStates.Default;
      setArray(array);
    }, 500);
    setValueInput("");
    setIndexInput("");
    setAddByIndexLoading(false)
  };

  const clickButtonDelByIndex = () => {
    setdeleteByIndexLoading(true);
    const newArray = array.concat();

    const downCircle = {
      value: newArray[indexInput].value,
      index: indexInput,
    };

    setIndexDownCircle(downCircle);

    list.delByIndex(indexInput);

    newArray[indexInput].value = "";
    newArray[indexInput].color = ElementStates.Changing;

    setArray(newArray);

    setTimeout(() => {
      const downCircle = {
        value: "",
        index: null,
      };

      setIndexDownCircle(downCircle);
      const array = [...newArray];

      array.splice(indexInput, 1);

      setArray(array);
    }, 500);

    setIndexInput("");
    setdeleteByIndexLoading(false);
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.stringbox}>
        <div className={styles.stringbox}>
          <div className={styles.inputbox}>
            <div className={styles.input}>
              <Input
                placeholder="Введите значение"
                max={11}
                onChange={onChangeValueInput}
                value={valueInput}
              ></Input>
              <p className={styles.maxText}>Максимум 4 символа</p>
            </div>
            <div className={styles.btn}>
              <Button
                text="Добавить в head"
                type="submit"
                onClick={clickButtonAddToHead}
                disabled={valueInput.length > 4 || valueInput == ""}
                isLoader={HeadLoading}
              />
            </div>
            <div className={styles.btn}>
              <Button
                text="Добавить в tail"
                type="submit"
                onClick={clickButtonAddToTail}
                disabled={valueInput.length > 4 || valueInput == ""}
                isLoader={TailLoading}
              />
            </div>
            <div className={styles.btn}>
              <Button
                text="Удалить из head"
                type="submit"
                onClick={clickButtonDelHead}
                disabled={array.length == 0}
                isLoader={DeleteHeadLoading}
              />
            </div>
            <div>
              <Button
                text="Удалить из tail"
                type="submit"
                onClick={clickButtonDelTail}
                disabled={array.length == 0}
                isLoader={DeleteTailLoading}
              />
            </div>{" "}
          </div>
        </div>

        <div className={styles.stringboxSecond}>
          <div className={styles.inputbox}>
            <div className={styles.input}>
              <Input
                placeholder="Введите индекс"
                max={11}
                onChange={onChangeIndexInput}
                value={indexInput}
                type={"number"}
              ></Input>
            </div>
            <div className={styles.btnBig}>
              <Button
                text="Добавить по индексу"
                type="submit"
                onClick={clickButtonAddByIndex}
                disabled={
                  indexInput > array.length ||
                  valueInput == "" ||
                  indexInput == ""
                }
                extraClass={styles.buttonWidth}
                isLoader={addByIndexLoading}
              />
            </div>
            <div className={styles.btnBig}>
              <Button
                text="Удалить по индексу"
                type="submit"
                onClick={clickButtonDelByIndex}
                disabled={indexInput == "" || indexInput > array.length-1}
                extraClass={styles.buttonWidth}
                isLoader={deleteByIndexLoading}
              />
            </div>
          </div>
        </div>
      </div>

      <ul className={styles.circles}>
        {array.map((item, index) => (
          <li className={styles.circle} key={index}>
            <div>
              {index == indexUpCircle && (
                <Circle
                  state={ElementStates.Changing}
                  letter={item.value}
                  isSmall={true}
                  extraClass={styles.upCircle}
                />
              )}
              {index == 0 && <p className={styles.head}>head</p>}
              <Circle letter={item.value} state={item.color} />
              <p>{index}</p>
              {index == array.length - 1 && <p className={styles.tail}>tail</p>}
              {index == indexDownCircle.index && (
                <Circle
                  state={ElementStates.Changing}
                  letter={indexDownCircle.value}
                  isSmall={true}
                  extraClass={styles.downCircle}
                />
              )}
            </div>
            {index !== array.length - 1 && <ArrowIcon />}
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
