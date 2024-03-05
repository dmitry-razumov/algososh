import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from './string.module.css'
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { swap } from "../../utils/swap";
import { DELAY_IN_MS } from "../../constants/delays";
import { TArrayStep, TElement } from "../../types/state-types";
import { animateStates } from "../../utils/animate-state";

export const StringComponent: React.FC = () => {
  const [isLoader, setLoader] = useState<boolean>(false);
  const [str, setString] = useState<string>('');
  const [array, setArray] = useState<TElement[]>([]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setString( event.target.value );
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    animateStates(reverseArray(str), setLoader, setArray, DELAY_IN_MS) 
  }

  const stringToArray = (str: string): TElement[] => {
    return str.split('')
    .map(letter => {return { value: letter, state: ElementStates.Default } })
  }

  const reverseArray = (str: string) => {
    let array = stringToArray(str);
    let steps: TArrayStep<TElement>[] = [{array: JSON.parse(JSON.stringify(array))}];
    let start = 0;
    let end = array.length - 1;
    while (start < end) {
      array[start].state = ElementStates.Changing;
      array[end].state = ElementStates.Changing;
      steps = [...steps, {array: JSON.parse(JSON.stringify(array))}];

      swap(array, start, end);

      array[start++].state = ElementStates.Modified;
      array[end--].state = ElementStates.Modified;
      steps = [...steps, {array: JSON.parse(JSON.stringify(array))}];
    }
    if ((start + end) % 2 === 0) {
      array[end].state = ElementStates.Modified;
      steps = [...steps, {array: JSON.parse(JSON.stringify(array))}];
    }
    return steps;
  }

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={onSubmit}>
        <Input value={str} isLimitText={true} maxLength={11} onChange={onChange}/>
        <Button type="submit" text="Развернуть" disabled={!str} isLoader={isLoader}/>
      </form>
      <div className={styles.array}>
        {array.map((element, index) => 
          <Circle key={index+element.value} letter={element.value} state={element.state}/>
        )}
     </div>
    </SolutionLayout>
  );
};
