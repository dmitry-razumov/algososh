import { ElementStates } from "./element-states"

export type TElement = {
  value: string,
  state: ElementStates,
}

export type TArrayStep<T> = {
  array: T[]
}