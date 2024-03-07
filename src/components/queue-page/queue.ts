export interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peek: () => T | null;
  isEmpty: () => boolean;
  toArray: () => Array<T>;
  getHead: () => number;
  getTail: () => number;
  getSize: () => number;
  getLength: () => number;
  clear: () => void;
}

export class Queue<T> implements IQueue<T> {
  private container: Array<T> = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;
  private defaultFill: T;

  constructor(size: number, defaultFill: T) {
    this.size = size;
    this.defaultFill = defaultFill;
    this.container = Array(size).fill(defaultFill);
  }

  isEmpty = () => this.length === 0;

  toArray = () => this.container;

  getHead = () => this.head;

  getTail = () => this.tail;

  getSize = () => this.size;

  getLength = () => this.length;

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error('Превышена максимальная длина');
    }
    if (!this.isEmpty()) {
      this.tail = (this.tail + 1) % this.size;
    }
    this.container[this.tail] = item;
    this.length++;
  }

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error('Очередь пуста');
    }
    this.container[this.head] = this.defaultFill;
    this.length--;
    if (this.length) this.head++;
  }

  peek = (): T | null => {
    if (this.isEmpty()) {
      throw new Error('Очередь пуста');
    }
    return this.container[this.head];
  }
  
  clear = () => {
    this.container = Array(this.size).fill(this.defaultFill);
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  }
}