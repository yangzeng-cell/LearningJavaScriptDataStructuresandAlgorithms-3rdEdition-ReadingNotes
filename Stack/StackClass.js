class Stack {
  constructor() {
    this.items = [];
  }
  // 添加一个（或几个）新元素到栈顶,返回值是数组的长度
  push(element) {
    return this.items.push(element);
  }
  //移除栈顶的元素，同时返回被移除的元素
  pop() {
    return this.items.pop();
  }

  //返回栈顶的元素，不对栈做任何修改（该方法不会移除栈顶的元素，仅仅返回它）
  peek() {
    return this.items[this.items.length - 1];
  }

  // 如果栈里没有任何元素就返回 true，否则返回 false
  isEmpty() {
    return this.items.length > 0 ? false : true;
  }

  // 移除栈里的所有元素
  clear() {
    this.items = [];
  }

  //返回栈里的元素个数。该方法和数组的 length 属性很类似
  size() {
    return this.items.length;
  }
}
