import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css"
import { RadioInput } from "../ui/radio-input/radio-input";
import { SortType } from "../../types/sort-type";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { Column } from "../ui/column/column";
import { animateStates } from "../../utils/animate-state";
import { createRandomArray } from "../../utils/array";
import { TElementS, sortBubble, sortSelection } from "./sort";

export const SortingPage: React.FC = () => {
  const ARRAY_LEN_MIN = 3;
  const ARRAY_LEN_MAX = 17;
  const ARRAY_NUM_MAX = 100;
  const [sortingType, setSortingType] = useState(SortType.Selection);
  const [isLoaderAsc, setLoaderAsc] = useState(false)
  const [isLoaderDesc, setLoaderDesc] = useState(false)
  const [isLoaderNewArr, setLoaderNewArr] = useState(false)
  const [randArray, setRandArray] = useState<TElementS[]>([]);

  const doSort = (sortDirection: Direction) => {
    const array = sortingType === SortType.Bubble
     ? sortBubble(sortDirection, randArray)
     : sortSelection(sortDirection, randArray)
    animateStates(array, sortDirection === Direction.Descending ? setLoaderDesc : setLoaderAsc, setRandArray)  
  }

  const getRandomArray = (minLength: number, maxLength: number, maxNumber: number): TElementS[] => {
    return createRandomArray(minLength, maxLength, maxNumber)
    .map(value => ({value: value, state: ElementStates.Default}))
  }

  const doNewArray = () => {
    setLoaderNewArr(true)
    setRandArray(JSON.parse(JSON.stringify(getRandomArray(ARRAY_LEN_MIN, ARRAY_LEN_MAX, ARRAY_NUM_MAX))))
    setLoaderNewArr(false)
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.control}>
        <div className={styles.radio}>
          <RadioInput label="Выбор" value={SortType.Selection} onChange={() => setSortingType(SortType.Selection)} 
            checked={sortingType === SortType.Selection} disabled={isLoaderAsc || isLoaderDesc}/>
          <RadioInput label="Пузырёк" value={SortType.Bubble} onChange={() => setSortingType(SortType.Bubble)} 
            checked={sortingType === SortType.Bubble} disabled={isLoaderAsc || isLoaderDesc}/>
        </div>
        <div className={styles.buttons}>
          <Button text="По возрастанию" sorting={Direction.Ascending} type="submit" isLoader={isLoaderAsc} 
            disabled={!randArray.length || isLoaderDesc} onClick={() => doSort(Direction.Ascending)} />
          <Button text="По убыванию" sorting={Direction.Descending} type="submit" isLoader={isLoaderDesc} 
            disabled={!randArray.length || isLoaderAsc} onClick={() => doSort(Direction.Descending)} />
        </div>
        <Button text="Новый массив" isLoader={isLoaderNewArr} disabled={isLoaderAsc || isLoaderDesc} onClick={doNewArray}/>
      </div>
      <div className={styles.array}>
        {randArray.map((element, index) => 
          <Column key={`${index}+${element.value}`} state={element.state} index={element.value}/>
        )}
     </div>
    </SolutionLayout>
  );
};
