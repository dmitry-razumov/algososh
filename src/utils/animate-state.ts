import { SHORT_DELAY_IN_MS } from "../constants/delays";
import { TArrayStep } from "../types/state-types";

export function animateStates<A extends TArrayStep<E>, E>( array: A[], setLoader: React.Dispatch<React.SetStateAction<boolean>>, 
  setArray: React.Dispatch<React.SetStateAction<E[]>>, delay = SHORT_DELAY_IN_MS, index = 0 ) {
  setLoader(true)
  if( index < array.length ) {
    window.setTimeout(function () {
      setArray(array[index].array);
      animateStates(array, setLoader, setArray, delay, ++index);
    }, delay);
  } else {
    setLoader(false)
  }
}