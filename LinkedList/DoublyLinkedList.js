import { DoublyNode } from "../linked-list-models.js";
import { defaultEquals } from "../util.js";
import LinkedList from "./LinkedList.js";

export default class DoublyLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals) {
    super(equalsFn);
    this.tail = undefined;
  }
  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new DoublyNode(element);
      let current = this.head;
      if (index === 0) {
        if (thid.head === null) {
          this.head = node;
          this.tail = node;
        } else {
          node.next = this.head;
          current.prev = node;
          this.head = node;
        }
      } else if (index === this.count) {
        current = this.tail;
        current.next = node;
        node.prev = current;
        this.tail = node;
      } else {
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        previous.next = node;
        node.prev = previous;
        node.next = current;
        current.prev = node;
      }
      this.count++;
      return true;
    }

    return falses;
  }

  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head;
      if (index === 0) {
        this.head = current.next;
        if (this.count === 1) {
          this.tail = undefined;
        } else {
          current.prev = undefined;
        }
      } else if ((index = this.count - 1)) {
        current = this.getElementAt(index);
        this.tail = current.prev;
        this.tail.next = undefined;
      } else {
        current = this.getElementAt(index);
        current.prev.next = current.next;
        current.next.prev = current.prev;
        current.next = undefined;
        current.prev = undefined;
      }
      this.count--;
      return current.element;
    }
    return undefined;
  }
}
