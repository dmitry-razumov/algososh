class Node<T> {
  value: T;
  next: Node<T> | null = null;

  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

interface ILinkedList<T> {
  append: (item: T) => void;
  prepend: (item: T) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  addByIndex: (item: T, position: number) => void;
  deleteByIndex: (position: number) => void;
  getSize: () => number;
  toArray: () => Array<T>;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;

  constructor(initialState?: T[]) {
    this.head = null;
    this.tail = null;
    this.size = 0;
    initialState?.forEach((element) => {
      this.append(element);
    });
  }

  append = (element: T) => {
    const node = new Node(element);
    if (this.head === null) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next
      }
      current.next = node;
    }
    this.size++;
  }

  prepend = (item: T) => {
    const node = new Node(item);
    if (this.head === null || undefined) {
      this.head = node;
    } else {
      let current = this.head;
      this.head = node;
      node.next = current;
    }
    this.size++;
  }

  deleteHead = () => {
    if (this.head) {
      this.head = this.head.next;
      this.size--;
    }
  }

  deleteTail = () => {
    if (this.head === null) {
      return null;
    }
    if (this.head.next === null) {
      this.head = null;
      this.size--;
      return null;
    }

    let current = this.head;
    while(current.next?.next) {
      current = current.next;
    }
    current.next = null;
    this.size--;
  }

  getSize = () => {
    return this.size;
  }

  addByIndex = (item: T, position: number) => {
    if (position >= this.size || position < 0) {
      throw new Error('Неправильное значение индекса');;
    }
    if (this.head === null) {
      this.head = new Node(item);
    }
    if (position === 0 && this.size !== 0) {
      this.prepend(item);
    } else {
      const node = new Node(item);
      let current = this.head;
      let prev = null;
      while (current.next !== null && position-1 >= 0) {
        prev = current;
        current = current.next;
        position--;
      }
      prev!.next = node;
      node.next = current;
    }
    this.size++;
  }

  deleteByIndex = (position: number) => {
    if (!this.head) {
      throw new Error('Список пуст');
    }
    if (position >= this.size || position < 0) {
      throw new Error('Неправильное значение индекса');
    }
    if (position === 0) {
      this.head = this.head.next;
      this.size--;
      return this.head;
    } 
    let current = this.head;
    while(current.next !== null && position-1 > 0){
      current = current.next;
      position--;
    }
    if (current.next?.next === null) {
      current.next = null;
      this.size--;
      return this.head;
    } 
    current.next = current.next!.next
    this.size--;
  }

  toArray = () => {
    let array: T[] = [];
    let currentPosition = this.head;
    while (currentPosition) {
      array.push(currentPosition.value);
      currentPosition = currentPosition.next;
    }
    return [...array];
  }
}