import React, { useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css"
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { LinkedList } from "./linkedList";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { TArrayStep, TElement} from "../../types/state-types";
import { animateStates } from "../../utils/animate-state";
import { createRandomArray } from "../../utils/array";
import { HEAD, TAIL } from "../../constants/element-captions";
import { useForm } from "../../hooks/useForm";

type TSmallElement = TElement & {
  type: "top" | "bottom"
}

type TElementLL = TElement & {
  smallElement: TSmallElement | null
}

type TArrayStepLL = TArrayStep<TElementLL>

export const ListPage: React.FC = () => {
  const initArray = useMemo( () => {
    return createRandomArray(6, 6, 9999).map(value => value.toString())
  }, [])
  const [isLoaderPrepend, setLoaderPrepend] = useState(false)
  const [isLoaderAppend, setLoaderAppend] = useState(false)
  const [isLoaderDelFromHead, setLoaderDelFromHead] = useState(false)
  const [isLoaderDelFromTail, setLoaderDelFromTail] = useState(false)
  const [isLoaderAddByIndex, setLoaderAddByIndex] = useState(false)
  const [isLoaderDelByIndex, setLoaderDelByIndex] = useState(false) 
  const [linkedList, setLinkedList] = useState<LinkedList<string>>(new LinkedList(initArray))
  const [listArray, setListArray] = useState<TElementLL[]>(initArray
    .map((value) => ({value: value, state: ElementStates.Default, smallElement: null})))
  const {values, handleChange, setValues} = useForm({value: "", index: 0})

  const getArrayFromLinkedList = (array: string[]): TElementLL[] => {
    let localListArray: TElementLL[] = [];
    array.map((el, index) => localListArray[index] = {value: el, state: ElementStates.Default, smallElement: null})
    return localListArray
  }

  const addToStepArray = (stepArray:TArrayStepLL[], localListArray: TElementLL[]) => {
    stepArray.push({array: JSON.parse(JSON.stringify(localListArray))})
  }

  const prepend = (value: string) => {
    let stepArray:TArrayStepLL[] = [];
    let localListArray: TElementLL[] = getArrayFromLinkedList(linkedList.toArray());

    linkedList.prepend(value)
    setLinkedList(linkedList)

    localListArray[0].smallElement = {value: value, state: ElementStates.Changing, type: "top"}
    addToStepArray(stepArray, localListArray)
    
    localListArray[0].smallElement = null;
    localListArray.unshift({...localListArray[0], value: value, state: ElementStates.Modified, smallElement: null});
    addToStepArray(stepArray, localListArray)
    
    localListArray[0].state = ElementStates.Default;
    addToStepArray(stepArray, localListArray)

    setValues({...values, value: ''});
    animateStates(stepArray, setLoaderPrepend, setListArray, SHORT_DELAY_IN_MS)
  }

  const append = (value: string) => {
    let stepArray:TArrayStepLL[] = [];
    let localListArray: TElementLL[] = getArrayFromLinkedList(linkedList.toArray());

    linkedList.append(value);
    setLinkedList(linkedList);

    localListArray[localListArray.length - 1].smallElement = {value: value, state: ElementStates.Changing, type: "top"}
    addToStepArray(stepArray, localListArray)

    localListArray[localListArray.length - 1].smallElement = null;
    localListArray.push({value: value, state: ElementStates.Modified, smallElement: null});
    addToStepArray(stepArray, localListArray)

    localListArray[localListArray.length - 1].state = ElementStates.Default;
    addToStepArray(stepArray, localListArray)

    setValues({...values, value: ''});
    animateStates(stepArray, setLoaderAppend, setListArray, SHORT_DELAY_IN_MS)
  }

  const deleteHead = () => {
    let stepArray:TArrayStepLL[] = [];
    let localListArray: TElementLL[] = getArrayFromLinkedList(linkedList.toArray());

    localListArray[0] = {...localListArray[0], value: '', 
      smallElement: {value: localListArray[0].value, state: ElementStates.Changing, type: 'bottom'}}
    addToStepArray(stepArray, localListArray)

    linkedList.deleteHead()
    setLinkedList(linkedList)

    localListArray.shift();
    addToStepArray(stepArray, localListArray)

    animateStates(stepArray, setLoaderDelFromHead, setListArray, SHORT_DELAY_IN_MS)
  }

  const deleteTail = () => {
    let stepArray:TArrayStepLL[] = [];
    let localListArray: TElementLL[] = getArrayFromLinkedList(linkedList.toArray());

    localListArray[listArray.length - 1] = {...listArray[listArray.length - 1], value: '',
      smallElement: {value: listArray[listArray.length - 1].value, state: ElementStates.Changing, type: 'bottom'}}
    addToStepArray(stepArray, localListArray)

    linkedList.deleteTail();
    setLinkedList(linkedList);

    localListArray.pop();
    addToStepArray(stepArray, localListArray)

    animateStates(stepArray, setLoaderDelFromTail, setListArray, SHORT_DELAY_IN_MS)
  }

  const addByIndex = (value: string, index: number) => {
    let stepArray:TArrayStepLL[] = [];
    let localListArray: TElementLL[] = getArrayFromLinkedList(linkedList.toArray());

    if (index > localListArray.length-1 || index < 0) {
      return;
    }

    linkedList.addByIndex(value, index);
    setLinkedList(linkedList);

    for (let i = 0; i <= index; i++) {
      localListArray[i] = {...localListArray[i], state: ElementStates.Changing,
        smallElement: { value: value, state: ElementStates.Changing, type: 'top'}}
      if (i > 0) {
        localListArray[i - 1].smallElement = null
      }
      addToStepArray(stepArray, localListArray)
    }

    localListArray[index] = {...localListArray[index], state: ElementStates.Default, smallElement: null}
    localListArray.splice(index, 0, {value: value, state: ElementStates.Modified, smallElement: null});
    addToStepArray(stepArray, localListArray)

    localListArray[index].state = ElementStates.Default;
    localListArray.forEach(element => {element.state = ElementStates.Default});
    addToStepArray(stepArray, localListArray)

    setValues({...values, value: "", index: 0});
    animateStates(stepArray, setLoaderAddByIndex, setListArray, SHORT_DELAY_IN_MS)
  }

  const deleteByIndex = (index: number) => {
    let stepArray:TArrayStepLL[] = [];
    let localListArray: TElementLL[] = getArrayFromLinkedList(linkedList.toArray());

    if (index > localListArray.length-1 || index < 0) {
      return;
    }

    linkedList.deleteByIndex(index);

    for (let i = 0; i <= index; i++) {
      localListArray[i].state = ElementStates.Changing
      addToStepArray(stepArray, localListArray)
    }

    localListArray[index] = {...localListArray[index], value: '',
      smallElement: { value: localListArray[index].value, state: ElementStates.Changing, type: 'bottom'}}
    addToStepArray(stepArray, localListArray)

    localListArray.splice(index, 1);
    index === 0
      ? localListArray[index] = {value: listArray[index].value, state: ElementStates.Modified, smallElement: null}
      : localListArray[index - 1] = {value: localListArray[index - 1].value, state: ElementStates.Modified, smallElement: null}
    addToStepArray(stepArray, localListArray)

    localListArray.forEach(element => element.state = ElementStates.Default)
    addToStepArray(stepArray, localListArray)

    setValues({...values, index: 0});
    animateStates(stepArray, setLoaderDelByIndex, setListArray, SHORT_DELAY_IN_MS)
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.grid}>
        <Input isLimitText={true} name={'value'} value={values.value} maxLength={4} type={'text'} onChange={handleChange} placeholder={'Введите значение'} 
          disabled={isLoaderPrepend || isLoaderAppend || isLoaderDelFromHead || isLoaderDelFromTail || isLoaderAddByIndex || isLoaderDelByIndex}/>
        <Button type="button" text={'Добавить в head'} isLoader={isLoaderPrepend} onClick={() => prepend(values.value)}
          disabled={!values.value || isLoaderAppend || isLoaderDelFromHead || isLoaderDelFromTail || isLoaderAddByIndex || isLoaderDelByIndex} />
        <Button type="button" text={'Добавить в tail'} isLoader={isLoaderAppend} onClick={() => append(values.value)}
          disabled={!values.value || isLoaderPrepend || isLoaderDelFromHead || isLoaderDelFromTail || isLoaderAddByIndex || isLoaderDelByIndex} />
        <Button type="button" text={'Удалить из head'} isLoader={isLoaderDelFromHead} onClick={deleteHead}
          disabled={!listArray.length || isLoaderPrepend || isLoaderAppend || isLoaderDelFromTail || isLoaderAddByIndex || isLoaderDelByIndex} />
        <Button type="button" text={'Удалить из tail'} isLoader={isLoaderDelFromTail} onClick={deleteTail}
          disabled={!listArray.length || isLoaderPrepend || isLoaderAppend || isLoaderDelFromHead || isLoaderAddByIndex || isLoaderDelByIndex} />
        <Input type={'number'} name={'index'} value={values.index} onChange={handleChange} placeholder={'Введите индекс'} max={listArray.length - 1} min={0} 
          disabled={isLoaderPrepend || isLoaderAppend || isLoaderDelFromHead || isLoaderDelFromTail || isLoaderAddByIndex || isLoaderDelByIndex}/>
        <Button type="button" text={'Добавить по индексу'} isLoader={isLoaderAddByIndex} onClick={() => addByIndex(values.value, values.index)} extraClass={styles.doubleBtn}
          disabled={!values.value || isLoaderPrepend || isLoaderAppend || isLoaderDelFromHead || isLoaderDelFromTail || isLoaderDelByIndex || values.index > listArray.length - 1 || values.index < 0} />
        <Button type="button" text={'Удалить по индексу'} isLoader={isLoaderDelByIndex} onClick={() => deleteByIndex(values.index)} extraClass={styles.doubleBtn}
          disabled={isLoaderPrepend || isLoaderAppend || isLoaderDelFromHead || isLoaderDelFromTail || isLoaderAddByIndex || values.index > listArray.length - 1 || values.index < 0} />
      </div>
      <div className={styles.array}>
        {listArray.map((element, index) =>
          <div className={styles.element} key={index}>
            {element.smallElement && (
              <Circle isSmall letter={element.smallElement.value} state={element.smallElement.state}
                extraClass={`${styles[`${element.smallElement.type}`]}`}
              />
            )}
            <Circle letter={element.value} index={index} state={element.state} 
              head={index === 0 && !element.smallElement ? HEAD : ""}
              tail={index === listArray.length - 1 && !element.smallElement ? TAIL : ""}
            />
            {index < listArray.length - 1 &&
              <ArrowIcon fill={element.state !== ElementStates.Changing ? '#0032FF' : '#D252E1'} />
            } 
          </div>
        )}
      </div>
    </SolutionLayout>
  );
};
