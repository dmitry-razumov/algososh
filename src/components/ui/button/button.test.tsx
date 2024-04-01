import { Button } from "./button"
import { fireEvent, render, screen } from "@testing-library/react";

describe ('Button component tests', () => {
  test('Should render button with text', () => {
    render(<Button text="someText"/>);
    expect(screen.getByRole('button')).toMatchSnapshot();
  })

  test('Should render button without text', () => {
    render(<Button />);
    expect(screen.getByRole('button')).toMatchSnapshot();
  })

  test('Should be disabled', () => {
    render(<Button disabled={true}/>);
    expect(screen.getByRole('button')).toMatchSnapshot();
  })

  test('Should be with loading', () => {
    render(<Button isLoader={true}/>);
    expect(screen.getByRole('button')).toMatchSnapshot();
  })

  test('Should be called callback 1 times', () => {
    const onClickCallback = jest.fn();
    render(<Button onClick={onClickCallback}/>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClickCallback).toBeCalledTimes(1);
  })
})