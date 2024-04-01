import { ElementStates } from "../../types/element-states"
import { reverseArray } from "./string"

const inputString = 'abcdef'
const reverseString = 'fedcba'

describe('test string reverse', () => {
  test('Should reverse even string', () => {
    let result = reverseArray(inputString)
    expect(result[6].array).toEqual(reverseString.split('').map(value => ({value, state: ElementStates.Modified})))
  })

  test('Should reverse odd string', () => {
    let result = reverseArray(inputString.slice(0, inputString.length-1))
    expect(result[5].array).toEqual(reverseString.slice(1, inputString.length).split('').map(value => ({value, state: ElementStates.Modified})))
  })

  test('Should reverse string with 1 symbol', () => {
    let result = reverseArray('A')
    expect(result[1].array).toEqual([{value: 'A', state: ElementStates.Modified}])
  })
  
  test('Should reverse empty string', () => {
    let result = reverseArray('')
    expect(result[0].array).toEqual([])
  })
})