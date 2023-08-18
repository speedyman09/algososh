import { ElementStates } from "../../types/element-states";

type TQueue<T> = {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  getContainer: () => T[];
  getLength: () => number;
  getTail: () => number;
  getHead: () => number;
  isFullQueue: () => boolean;
  isEmpty: () => boolean;
  clear: () => void;
}

export class Queue<T> implements TQueue<T> {
  private container: T[] = [];
  private item = { value: "", color: ElementStates.Default };
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size).fill(this.item);
  }

  enqueue = (item: T) => {
    if (this.getLength() >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    if (this.tail === this.size) {
      this.container[this.tail % this.size] = item;
      this.tail = -1;
    }
    if (this.head < this.size) {
      this.container[this.tail % this.size] = item;
      this.tail++;
    }
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    this.container[this.head % this.size] = this.item as any;
    this.head++;
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    return this.container[this.head];
  };
  getLength = (): number => {
    return this.tail - this.head;
  };
  getTail = (): number => {
    return this.tail;
  };
  getHead = (): number => {
    return this.head;
  };
  getContainer = (): T[] => {
    return this.container;
  };
  isFullQueue = (): boolean => {
    return this.tail === this.size;
  };
  clear =(): void => {
    this.container = Array(this.size).fill(this.item);
    this.head = 0;
    this.tail = 0;
  }
  isEmpty = (): boolean => this.getLength() === 0;
}
