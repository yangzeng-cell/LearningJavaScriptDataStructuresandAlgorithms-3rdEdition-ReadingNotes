import { defaultEquals } from "../util";
import LinkedList from "./LinkedList.js";

export default class CircularLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals) {
    super(equalsFn);
  }

  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element);
      let current = this.head;
      if (index === 0) {
        if (this.head === null) {
          this.head = node;
          node.next = this.head;
        } else {
          this.head = node;
          current = this.getElementAt(this.size() - 1);
          current.next = this.head;
        }
      } else {
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        previous.next = node;
        node.next = currents;
      }
      this.count++;
      return true;
    }
    return false;
  }
}
