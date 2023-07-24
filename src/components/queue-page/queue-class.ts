interface IQueue<T> {
  enqueue: (value: T) => void;
  dequeue: () => void;
  getHead: () => { value: T | null; index: number };
  getTail: () => { value: T | null; index: number };
  clear: () => void;
}

export default class Queue<T> implements IQueue<T> {
  container: (T | null)[] = [];
  head: number = 0;
  tail: number = 0;
  length: number = 0;

  constructor() {
    this.container = Array();
  }

  enqueue(item: T) {
    this.container[this.tail] = item;
    this.tail++;
    this.length++;
  }

  dequeue() {
    this.container[this.head] = null;
    this.head++;
    this.length--;
  }

  clear = () => {
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  };

  getHead = (): { value: T | null; index: number } => {
    return { value: this.container[this.head], index: this.head };
  };

  getTail = (): { value: T | null; index: number } => {
    return { value: this.container[this.tail - 1], index: this.tail - 1 };
  };
}
