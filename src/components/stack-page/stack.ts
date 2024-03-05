interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peek: () => T | null;
  clear: () => void;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];
  private tail = 0;

  push = (item: T): void => {
    this.tail++;
    this.container.push(item);

  };

  pop = (): void => {
   this.container.pop();
   this.tail--;
  };

  peek = (): T => {
    return this.container[this.container.length-1]
  };

  clear = (): void => {
    this.container = [];
    this.tail = 0;
  };

  toArray = (): T[] => {
    return this.container;
  }
}