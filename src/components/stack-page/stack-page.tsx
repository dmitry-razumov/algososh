import React, { useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css"
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Stack } from "./stack";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Circle } from "../ui/circle/circle";
import { TArrayStep, TElement } from "../../types/state-types";
import { animateStates } from "../../utils/animate-state";
import { useForm } from "../../hooks/useForm";

export const StackPage: React.FC = () => {
  const {values, handleChange, setValues} = useForm({value: ""})
  const [stateArray, setStateArray] = useState<TElement[]>([]);
  const [isLoaderPush, setLoaderPush] = useState(false);
  const [isLoaderPop, setLoaderPop] = useState(false);
  const [isLoaderRst, setLoaderRst] = useState(false);
  const stack = useMemo(() => new Stack<TElement>(), []);

  const push = (event: React.FormEvent<HTMLFormElement>, value: string) => {
    event.preventDefault();
    
    stack.push({value: value, state: ElementStates.Changing});
    let stepArray:TArrayStep<TElement>[] = [{array: JSON.parse(JSON.stringify(stack.toArray()))}]

    stack.peek().state = ElementStates.Default
    stepArray = [...stepArray, {array: JSON.parse(JSON.stringify(stack.toArray()))}]

    setValues({...values, value:''});
    animateStates(stepArray, setLoaderPush, setStateArray, SHORT_DELAY_IN_MS)
  }

  const pop = () => {
    stack.peek().state = ElementStates.Changing  
    let stepArray:TArrayStep<TElement>[] = [{array: JSON.parse(JSON.stringify(stack.toArray()))}]

    stack.pop()
    stepArray = [...stepArray, {array: JSON.parse(JSON.stringify(stack.toArray()))}]

    animateStates(stepArray, setLoaderPop, setStateArray, SHORT_DELAY_IN_MS) 
  }

  const reset = () => {
    setLoaderRst(true)
    stack.clear();
    setStateArray([])
    setLoaderRst(false)
  }

  return (
    <SolutionLayout title="Стек">
      <form className={styles.control} onSubmit={e => push(e, values.value)}>
        <Input isLimitText={true} value={values.value} name={"value"} maxLength={4} onChange={handleChange} extraClass={styles.input}/>
        <Button type={'submit'} isLoader={isLoaderPush} disabled={!values.value || isLoaderPop || isLoaderRst } text="Добавить"/>
        <Button type={'button'} isLoader={isLoaderPop} disabled={!stateArray.length || isLoaderPush || isLoaderRst } onClick={() => pop()} text="Удалить"/>
        <div className={styles.reset}>
          <Button type={'reset'} isLoader={isLoaderRst} disabled={!stateArray.length || isLoaderPush || isLoaderPop} onClick={reset} text="Очистить"/>
        </div>
      </form>
      <div className={styles.array}>
        {stateArray.map((element, index) =>
          <Circle letter={element.value} key={`${index}+${element.value}`} state={element.state} head={stateArray.length === index + 1 ? 'top' : null} index={index}/>
          )}
      </div>
    </SolutionLayout>
  );
};
