class Deque {
  // 双端队列，遵循先进先出和后进先出

  constructor() {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }

  isEmpty() {
    return this.count - this.lowestCount === 0;
  }

  clear() {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }

  size() {
    return this.count - this.lowestCount;
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
  // 该方法在双端队列前端添加新的元素
  addFront(element) {
    if (this.isEmpty()) {
      this.addBack(element);
    } else if (this.lowestCount > 0) {
      this.lowestCount--;
      this.items[this.lowestCount] = element;
    } else {
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1];
      }
      this.items[0] = element;
      this.lowestCount = 0;
      this.count++;
    }
  }

  // 该方法在双端队列后端添加新的元素（实现方法和 Queue 类中的enqueue 方法相同）
  addBack(element) {
    this.items[this.count] = element;
    this.count++;
  }
  // 该方法会从双端队列前端移除第一个元素（实现方法和 Queue 类中的dequeue 方法相同）
  removeFront() {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;

    return result;
  }

  //该方法会从双端队列后端移除第一个元素（实现方法和 Stack 类中的pop 方法一样）。
  removeBack() {
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;

    const result = this.items[this.count];

    delete this.items[this.count];

    return result;
  }

  // 该方法返回双端队列前端的第一个元素（实现方法和 Queue 类中的 peek方法一样）。
  peekFront() {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.items[this.lowestCount];
  }

  // 该方法返回双端队列后端的第一个元素（实现方法和 Stack 类中的 peek方法一样）
  peekBack() {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.items[this.count];
  }
}

// const deque = new Deque();
// console.log(deque.isEmpty()); // 输出 true
// deque.addBack("John");
// deque.addBack("Jack");
// console.log(deque.toString()); // John, Jack
// deque.addBack("Camila");
// console.log(deque.toString()); // John, Jack, Camila
// console.log(deque.size()); // 输出 3
// console.log(deque.isEmpty()); // 输出 false
// deque.removeFront(); // 移除 John
// console.log(deque.toString()); // Jack, Camila
// deque.removeBack(); // Camila 决定离开
// console.log(deque.toString()); // Jack
// deque.addFront("John"); // John 回来询问一些信息
// console.log(deque.toString()); // John, Jack

export default Deque;
