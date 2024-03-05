import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { TArrayStep, TElement } from "../../types/state-types";
import { swap } from "../../utils/swap";

export type TElementS = Omit<TElement, 'value'> & {
  value: number
}

export const sortSelection = <A extends TArrayStep<E>, E extends TElementS >(sortDirection: Direction, inArray: E[]): A[] => {
  let sortArray: A[] = [];
  let array: E[] = JSON.parse(JSON.stringify(inArray));
  const { length } = array;
  
  sortArray = [{array: JSON.parse(JSON.stringify(array))}] as A[];

  for (let i = 0; i < length - 1; i++) {
    let index = i;
    for (let j = i + 1; j < length; j++) {
      array[i].state = ElementStates.Changing;
      array[j].state = ElementStates.Changing;
      sortArray = [...sortArray, {array: JSON.parse(JSON.stringify(array))}] as A[];
      if (sortDirection === Direction.Ascending 
        ? array[j].value < array[index].value
        : array[j].value > array[index].value ) {
        index = j;
      }
      array[j].state = ElementStates.Default
      sortArray = [...sortArray, {array: JSON.parse(JSON.stringify(array))}] as A[];
    }
    if (index !== i) {
      swap(array, i, index)
      array[index].state = ElementStates.Default
    }
    array[i].state = ElementStates.Modified;
    sortArray = [...sortArray, {array: JSON.parse(JSON.stringify(array))}] as A[];
  }
  array[length-1].state = ElementStates.Modified;
  sortArray = [...sortArray, {array: JSON.parse(JSON.stringify(array))}] as A[];
  return sortArray
}

export const sortBubble = <A extends TArrayStep<E>, E extends TElementS>(sortDirection: Direction, inArray: E[]): A[] => {
  let sortArray: A[] = [];
  let array: E[] = JSON.parse(JSON.stringify(inArray));
  const { length } = array;
  
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      array[j].state = ElementStates.Changing;
      array[j + 1].state = ElementStates.Changing;
      sortArray = [...sortArray, {array: JSON.parse(JSON.stringify(array))}] as A[];

      if (sortDirection === Direction.Ascending 
        ? array[j].value > array[j+1].value
        : array[j].value < array[j+1].value ) {
        swap(array, j, j+1)
      }
      array[j].state = ElementStates.Default;
    }
    array[length - i - 1].state = ElementStates.Modified;
    sortArray = [...sortArray, {array: JSON.parse(JSON.stringify(array))}] as A[];
  };
  return sortArray
}