// 定义每个节点的信息
export class Node {
  constructor(element) {
    this.element = element;
    this.next = undefined;
  }
}

export class DoublyNode extends Node{
  constructor()
}

export class valuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }

  toString() {
    return `[${this.key},${this.value}]`;
  }
}
