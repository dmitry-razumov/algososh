import { render } from "@testing-library/react"
import { Circle } from "./circle"
import { ElementStates } from "../../../types/element-states"

describe('Circle component tests', () => {
  test('Should render without letter', () => {
    render(<Circle />)
    expect(document.body).toMatchSnapshot();
  })

  test('Should render with letter', () => {
    render(<Circle letter="XY"/>)
    expect(document.body).toMatchSnapshot();
  })

  test('Should render with head', () => {
    render(<Circle head="head"/>)
    expect(document.body).toMatchSnapshot();
  })

  test('Should render with react element in head', () => {
    render(<Circle head={<Circle />}/>)
    expect(document.body).toMatchSnapshot();
  })

  test('Should render with tail', () => {
    render(<Circle tail="tail"/>)
    expect(document.body).toMatchSnapshot();
  })

  test('Should render with react element in tail', () => {
    render(<Circle tail={<Circle />}/>)
    expect(document.body).toMatchSnapshot();
  })

  test('Should render with index', () => {
    render(<Circle index={1}/>)
    expect(document.body).toMatchSnapshot();
  })

  test('Should render with prop isSmall={true}', () => {
    render(<Circle isSmall={true}/>)
    expect(document.body).toMatchSnapshot();
  })

  test('Should render with state Default', () => {
    render(<Circle state={ElementStates.Default}/>)
    expect(document.body).toMatchSnapshot();
  })

  test('Should render with state Changing', () => {
    render(<Circle state={ElementStates.Changing}/>)
    expect(document.body).toMatchSnapshot();
  })
  
  test('Should render with state Modified', () => {
    render(<Circle state={ElementStates.Modified}/>)
    expect(document.body).toMatchSnapshot();
  })
})