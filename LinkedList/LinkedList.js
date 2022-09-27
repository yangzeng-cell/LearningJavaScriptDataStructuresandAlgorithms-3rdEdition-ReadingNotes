import { defaultEquals } from "../util.js";
import { Node } from "../linked-list-models.js";

export default class LinkedList {
  constructor(equalFn = defaultEquals) {
    // 用来存储链表中的元素数量
    this.count = 0;
    this.head = undefined;
    //自定义 用来比较是否相等 如果没有定义则使用默认的比较方法
    this.equalFn = equalFn;
  }
  //向链表尾部添加一个新元素
  push(element) {
    const node = new Node(element);
    // 先判断链表为空的情况
    if (this.head === undefined) {
      this.head = node;
    } else {
      let current = this.head;
      // 循环找到最后一个节点
      while (current.next != null) {
        current = current.next;
      }

      current.next = node;
    }
    // 数值加一
    this.count++;
  }

  // 向链表的特定位置插入一个新元素
  insert(element, position) {
    if (position >= 0 && position <= this.count) {
      const node = new Node(element);
      if (position === 0) {
        const current = this.head;
        this.head = node;
        node.next = current;
      } else {
        const previous = this.getElementAt(position - 1);
        const current = previous.next;
        previous.next = node;
        node.next = current;
      }
      this.count++;
      return true;
    }
    return false;
  }

  // 返回链表中特定位置的元素。如果链表中不存在这样的元素，则返回 undefined
  getElementAt(index) {
    if (index < 0 || index >= this.count) {
      return undefined;
    }

    let current = this.head;

    for (let i = 0; i < index && current != null; i++) {
      current = current.next;
    }

    return current;
  }

  // 从链表中移除一个元素
  remove(element) {
    const currentIndex = this.indexOf(element);
    return this.removeAt(currentIndex);
  }

  // 返回元素在链表中的索引。如果链表中没有该元素则返回-1
  indexOf(element) {
    let current = this.head;
    for (let i = 0; i < this.count && current != null; i++) {
      if (this.equalFn(element, current.element)) {
        return i;
      }
      current = current.next;
    }
    return -1;
  }

  // 从链表的特定位置移除一个元素
  removeAt(position) {
    // 边界判断
    if (position >= this.count || position < 0) {
      return undefined;
    }

    let current = this.head;
    let previous = this.head;
    // 当是第一个值时
    if (position === 0) {
      this.head = current.next;
    } else {
      // for循环拿到curent
      // for (let i = 0; i < position; i++) {
      //   /**
      //    * 获得之前的值，当到达目标值的时候，current.next就指向下一个值了，previous指向前一个之
      //    */
      //   previous = current;
      //   current = current.next;
      // }
      // 重构
      previous = this.getElementAt(position - 1);
      current = previous.next;
      previous.next = current.next;
    }
    this.count--;

    return current.element;
  }

  // 如果链表中不包含任何元素，返回 true，如果链表长度大于 0则返回 false
  isEmpty() {
    return this.count === 0;
  }

  // 返回链表包含的元素个数，与数组的 length 属性类似
  size() {
    return this.count;
  }

  // 返回表示整个链表的字符串。由于列表项使用了 Node 类，就需要重写继承自 JavaScript 对象默认的 toString 方法，让其只输出元素的值
  toString() {
    if (this.head === null) {
      return "";
    }
    let objString = `${this.head.element}`;
    let current = this.head.next;
    for (let i = 1; i < this.count && current != null; i++) {
      objString += `,${current.element}`;
      current = current.next;
    }

    return objString;
  }
}
