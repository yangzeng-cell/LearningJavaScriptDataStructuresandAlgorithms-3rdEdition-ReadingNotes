import { Compare, defaultCompare, defaultEquals } from "../util";
import LinkedList from "./LinkedList.js";

export class SortLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals, compareFn = defaultCompare) {
    super(equalsFn);
    this.compareFn = compareFn;
  }

  insert(element, index = 0) {
    if (this.isEmpty()) {
      return super().insert(element, index);
    }
    const position = this.getIndexNextSortedElement(element);

    return super().insert(element, position);
  }

  getIndexNextSortedElement(element) {
    let current = this.head;
    let i = 0;
    for (; i < this.size(); i++) {
      const comp = this.compareFn(element, current.element);

      if (comp === Compare.LESS_THAN) {
        return i;
      }

      current = current.next;
    }
    return i;
  }
}
