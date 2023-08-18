import React, { ChangeEvent, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { TElement } from "../../types/element";
import { ElementStates } from "../../types/element-states";
import { timeOut } from "../../utils/delay";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Queue } from "./class";
import style from "./queue-page.module.css";

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [queue] = useState(new Queue<TElement>(7));
  const [renderArr, setRenderArr] = useState<TElement[]>(queue.getContainer());
  const [loaderEnqueue, setLoaderEnqueue] = useState(false);
  const [loaderDequeue, setLoaderDequeue] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  const handleClickEnqueue = async () => {
    if (inputValue) {
      setLoaderEnqueue(true);
      queue.enqueue({ value: inputValue, color: ElementStates.Changing });
      setInputValue("");
      setRenderArr([...queue.getContainer()]);
      await timeOut(SHORT_DELAY_IN_MS);
      queue.getContainer()[queue.getTail() - 1].color = ElementStates.Default;
      setRenderArr([...queue.getContainer()]);
      setLoaderEnqueue(false);
    }
  };

  const handleClickDequeue = async () => {
    setLoaderDequeue(true);
    queue.getContainer()[queue.getHead()].color = ElementStates.Changing;
    setRenderArr([...queue.getContainer()]);
    await timeOut(SHORT_DELAY_IN_MS);
    queue.dequeue();
    setRenderArr([...queue.getContainer()]);
    setLoaderDequeue(false);
  };

  const handleClickClear = () => {
    queue.clear();
    setRenderArr([...queue.getContainer()]);
  };

  return (
    <SolutionLayout title="Очередь">
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
          onClick={handleClickEnqueue}
          isLoader={loaderEnqueue}
          text="Добавить"
          type="submit"
          disabled={loaderDequeue || !inputValue || queue.isFullQueue()}
          linkedList="small"
          extraClass={`mr-6 ${style.addBtn}`}
        />
        <Button
          onClick={handleClickDequeue}
          isLoader={loaderDequeue}
          text="Удалить"
          data-cy="remove"
          disabled={loaderEnqueue || !!queue.isEmpty()}
          linkedList="small"
          extraClass={`mr-40 ${style.deleteBtn}`}
        />
        <Button
          onClick={handleClickClear}
          text="Очистить"
          type="reset"
          disabled={loaderDequeue || loaderEnqueue || !!queue.isEmpty()}
          linkedList="small"
          extraClass={style.clearBtn}
        />
      </div>
      <div className={style.queueWrapper}>
        {renderArr.map((item: TElement, index: number) => (
          <Circle
            key={index}
            index={index}
            letter={item.value}
            state={item.color}
            head={index === queue.getHead() && !queue.isEmpty() ? "head" : ""}
            tail={
              index === queue.getTail() - 1 && !queue.isEmpty() ? "tail" : ""
            }
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
