export type TStack<T> = {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getContainer: () => T[];
  clear: () => number;
};

export class Stack<T> implements TStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    if (this.container.length > 0) this.container.pop();
  };

  peak = (): T | null => {
    if (this.container.length > 0)
      return this.container[this.container.length - 1];
    return null;
  };
  getContainer = (): T[] => this.container;
  clear = (): number => (this.container.length = 0);
}
