import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci.module.css"
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { TArrayStep, TElement } from "../../types/state-types";
import { animateStates } from "../../utils/animate-state";
import { fibonacci } from "./fibonacci";
import { useForm } from "../../hooks/useForm";

export const FibonacciPage: React.FC = () => {
  const FIB_MAX = 19;
  const [isLoader, setLoader] = useState<boolean>(false);
  const [array, setArray] = useState<TElement[]>([]);
  const {values, handleChange} = useForm({value: ""})

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const record = fibonacci(Number(values.value));
    const recordToArray = Object.values(record)
        .map(v => ({ value: v.toString(), state: ElementStates.Default })) as TElement[]
    let stepArray: TArrayStep<TElement>[] = [];
    for (let i = 0; i < recordToArray.length; i++) {
      stepArray.push({array: recordToArray.slice(0, i+1)})
    }
    animateStates(stepArray, setLoader, setArray, SHORT_DELAY_IN_MS) 
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
        <form className={styles.form} onSubmit={onSubmit}>
        <Input value={values.value} name={"value"} type={"number"} isLimitText={true} max={FIB_MAX} onChange={handleChange} placeholder="Введите число" disabled={isLoader} />
        <Button type="submit" text="Рассчитать" disabled={!values.value || Number(values.value) > FIB_MAX || Number(values.value) < 1} isLoader={isLoader} />
      </form>
      <div className={styles.grid}>
        {array.map((element, index) => 
          <Circle key={index+element.value} letter={element.value} state={element.state} index={index}/>
        )}
     </div>
    </SolutionLayout>
  );
};
