import DoublyLinkedList from "./DoublyLinkedList";

export default class StackLinkedList {
  constructor() {
    this.item = new DoublyLinkedList();
  }

  push(element) {
    this.item.push(element);
  }

  pop() {
    if (this.item.isEmpty()) {
      return undefined;
    }

    return this.item.removeAt(this.item.size() - 1);
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.item.getElementAt(this.item.size() - 1);
  }

  isEmpty() {
    return this.item.isEmpty();
  }

  size() {
    return this.item.size();
  }

  clear() {
    this.item.clear();
  }

  toString() {
    return this.item.toString();
  }
}
