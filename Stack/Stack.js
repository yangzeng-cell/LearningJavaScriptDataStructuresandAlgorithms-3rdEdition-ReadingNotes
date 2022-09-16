class Stack {
  constructor() {
    this.count = 0;
    this.items = {};
  }

  push(element) {
    this.items[this.count] = element;
    this.count++;
  }

  size() {
    return this.count;
  }

  isEmpty() {
    return this.count === 0;
  }

  pop() {
    if (this.isEmpty()) {
      return undefined;
    }

    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }

  clear() {
    this.count = 0;
    this.items = {};

    // while(!this.isEmpty()){
    //   this.pop()
    // }
  }

  peek() {
    if (!this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - 1];
  }

  toString() {
    if (!this.isEmpty()) {
      return "";
    }
    let str = this.items[0];
    for (let i = 1; i < this.count; i++) {
      str = str + `,${this.items[i]}`;
    }
    return str;
  }
}

/**
 * 保护数据的内部结构，js中没有私有属性，
 */

// const stack = new Stack();
// console.log(Object.getOwnPropertyNames(stack)); // {1}
// console.log(Object.keys(stack)); // {2}
// console.log(stack.items);

// const _items = new Symbol("stackItem");

// class Stack {
//   constructor() {
//     //使用计算属性和symbol的形式
//     this[_items] = {};
//   }
// }

export default Stack;
