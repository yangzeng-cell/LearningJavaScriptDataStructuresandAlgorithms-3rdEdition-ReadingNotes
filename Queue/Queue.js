class Queue {
  /**
   * 首先需要一个用于存储队列中元素的数据结构。我们可以使用数组，就像上一章的 Stack
类那样。但是，为了写出一个在获取元素时更高效的数据结构，我们将使用一个对象来存储我们
的元素（行{3}）。你会发现 Queue 类和 Stack 类非常类似，只是添加和移除元素的原则不同
也可以声明一个 count 属性来帮助我们控制队列的大小（行{1}）。此外，由于我们将要从队
列前端移除元素，同样需要一个变量来帮助我们追踪第一个元素。因此，声明一个 lowestCount
变量（行{2}）
   */
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }
  // 向队列尾部添加一个（或多个）新的项
  enqueue(...elements) {
    for (let i = 0; i < elements.length; i++) {
      this.items[this.count] = elements[i];
      this.count++;
    }
  }

  // 移除队列的第一项（即排在队列最前面的项）并返回被移除的元素
  dequeue() {
    if (this.count === 0) {
      return undefined;
    }

    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;

    return result;
  }
  // 返回队列中第一个元素——最先被添加，也将是最先被移除的元素。队列不做
  // 任何变动（不移除元素，只返回元素信息——与 Stack 类的 peek 方法非常类似）。该方
  // 法在其他语言中也可以叫作 front 方法
  peek() {
    if (this.count === 0) {
      return undefined;
    }

    return this.items[this.lowestCount];
  }
  // 如果队列中不包含任何元素，返回 true，否则返回 false
  isEmpty() {
    return this.count - this.lowestCount === 0 ? true : false;
  }
  // 返回队列包含的元素个数，与数组的 length 属性类似
  size() {
    return this.count - this.lowestCount;
  }

  clear() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  toString() {
    let str = "";
    if (this.isEmpty()) {
      return str;
    }
    str = this.items[this.lowestCount];
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      str += `,${this.items[i]}`;
    }

    return str;
  }
}

// const queue = new Queue();
// console.log(queue.isEmpty()); // 输出 true

// queue.enqueue("John");
// queue.enqueue("Jack");
// console.log(queue.toString()); // John,Jack
// queue.enqueue("Camila");
// console.log(queue.toString()); // John, Jack, Camila
// console.log(queue.size()); // 输出 3
// console.log(queue.isEmpty()); // 输出 false
// queue.dequeue(); // 移除 John
// queue.dequeue(); // 移除 Jack
// console.log(queue.toString()); // Camila

export default Queue;
