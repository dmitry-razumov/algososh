import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "../stack-page/stack-page.module.css"
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Queue } from "./queue";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { TArrayStep, TElement } from "../../types/state-types";
import { animateStates } from "../../utils/animate-state";
import { HEAD, TAIL } from "../../constants/element-captions";
import { useForm } from "../../hooks/useForm";

type TElementQ = TElement & {
  head: boolean,
  tail: boolean
}

type TArrayStepQ = TArrayStep<TElementQ>

export const QueuePage: React.FC = () => {
  const QUEUE_MAX_LEN = 7;
  const [tail, setTail] = useState<number>(0);
  const [isLoaderEnqueue, setLoaderEnqueue] = useState(false);
  const [isLoaderDequeue, setLoaderDequeue] = useState(false);
  const [isLoaderClear, setLoaderClear] = useState(false);
  const [queue, setQueue] = useState(new Queue<string>(QUEUE_MAX_LEN, ""));
  const [stateArray, setStateArray] = useState<TElementQ[]>(Array.from({ length: QUEUE_MAX_LEN },
     (v, index) => ({ value: '', state: ElementStates.Default, 
     head: !index, tail: !index})));
  const {values, handleChange, setValues} = useForm({value: ""})

  const getArrayFromQueue = (array: string[], head: number, tail: number): TElementQ[] => {
    let localQueue: TElementQ[] = []
    array.map((el, index) => localQueue[index] = {value: el, state: ElementStates.Default,
      head: index === head,  tail: index === tail})
    return localQueue
  }

  const addToStepArray = (stepArray:TArrayStepQ[], localQueue: TElementQ[]) => {
    stepArray.push({array: JSON.parse(JSON.stringify(localQueue))})
  }

  const enqueue = (event: React.FormEvent<HTMLFormElement>, value: string) => {
    event.preventDefault()

    let stepArray:TArrayStepQ[] = []
    let localQueue: TElementQ[] = getArrayFromQueue(queue.toArray(), queue.getHead(), queue.getTail())

    let tail = queue.getTail()
    if (tail < QUEUE_MAX_LEN - 1) {
      localQueue[ localQueue[tail].value !== '' ? tail+1 : tail].state = ElementStates.Changing
      addToStepArray(stepArray, localQueue)
    
      queue.enqueue(value)
      setQueue(queue)

      localQueue = getArrayFromQueue(queue.toArray(), queue.getHead(), queue.getTail())
      addToStepArray(stepArray, localQueue)
    }

    setValues({...values, value: ''});
    animateStates(stepArray, setLoaderEnqueue, setStateArray, SHORT_DELAY_IN_MS)  
  }

  const dequeue = () => {
    let stepArray:TArrayStepQ[] = []
    let localQueue: TElementQ[] = getArrayFromQueue(queue.toArray(), queue.getHead(), queue.getTail())

    localQueue[queue.getHead()].state = ElementStates.Changing 
    addToStepArray(stepArray, localQueue)

    queue.dequeue()
    setQueue(queue)

    localQueue = getArrayFromQueue(queue.toArray(), queue.getHead(), queue.getTail())
    addToStepArray(stepArray, localQueue)

    animateStates(stepArray, setLoaderDequeue, setStateArray, SHORT_DELAY_IN_MS)  
  }

  const clear = () => {
    setLoaderClear(true)
    queue.clear();
    setStateArray(getArrayFromQueue(queue.toArray(), queue.getHead(), queue.getTail()))
    setTail(queue.getTail)
    setLoaderClear(false)
  }

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.control} onSubmit={(e) => enqueue(e, values.value)}>
        <Input isLimitText={true} value={values.value} name="value" maxLength={4} onChange={handleChange} extraClass={styles.input} />
        <Button type={'submit'} isLoader={isLoaderEnqueue}
          disabled={!values.value || isLoaderDequeue || isLoaderClear || tail === QUEUE_MAX_LEN - 1} text="Добавить"/>
        <Button type={'button'} isLoader={isLoaderDequeue}
          disabled={!stateArray.length || isLoaderEnqueue || isLoaderClear || queue.isEmpty() } onClick={() => dequeue()} text="Удалить"/>
        <div className={styles.reset}>
          <Button type={'reset'} isLoader={isLoaderClear}
            disabled={!stateArray.length || isLoaderEnqueue || isLoaderDequeue  } onClick={clear} text="Очистить"/>
        </div>
      </form>
      <div className={styles.array}>
        {stateArray.map((element, index) =>
          <Circle letter={element.value} key={`${index}+${element.value}`} state={element.state} head={element.head ? HEAD : ""} tail={element.tail ? TAIL : ""} index={index}/>
          )}
      </div>
    </SolutionLayout>
  );
};
