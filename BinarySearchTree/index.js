import { Compare, defaultCompare } from "../util.js";

export class Node {
  constructor(key) {
    this.key = key; //节点值
    this.left = null; //左侧子节点引用
    this.right = null; //右侧节点引用
  }
}

export default class BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn; //用来比较节点的值
    this.root = null; //node类型的根节点
  }
  /**
   * 向树中插入一个新的键
   * @param {*} key
   */
  insert(key) {
    if (this.root == null) {
      this.root = new Node(key);
    } else {
      this.insertNode(this.root, key);
    }
  }

  insertNode(node, key) {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left == null) {
        node.left = new Node(key);
      } else {
        this.insertNode(node.left, key);
      }
    } else {
      if (node.right == null) {
        node.right = new Node(key);
      } else {
        this.insertNode(node.right, key);
      }
    }
  }

  serachNode(node, key) {
    if (node == null) {
      return false;
    }

    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      return this.serachNode(node.left, key);
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      return this.serachNode(node.right, key);
    } else {
      return true;
    }
  }

  /**
   * 在树中查找一个键。如果节点存在，则返回 true；如果不存在，则返回false
   * @param {*} key
   */
  search(key) {
    return this.serachNode(this.root, key);
  }

  inOrderTraverseNode(node, callback) {
    if (node != null) {
      this.inOrderTraverseNode(node.left, callback);
      callback(node.key);
      this.inOrderTraverseNode(node.right, callback);
    }
  }

  /**
   * 通过中序遍历方式遍历所有节点
   */
  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback);
  }

  preOrderTraverseNode(node, callback) {
    if (node != null) {
      callback(node.key);
      this.preOrderTraverseNode(node.left, callback);
      this.preOrderTraverseNode(node.right, callback);
    }
  }
  /**
   * 通过先序遍历方式遍历所有节点
   * preOrderTraverse
   */
  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback);
  }

  postOrderTraverseNode(node, callback) {
    if (node == null) return;
    this.postOrderTraverseNode(node.left, callback);
    this.postOrderTraverseNode(node.right, callback);
    callback(node.key);
  }

  /**
   * 通过后序遍历方式遍历所有节点
   */
  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this.root, callback);
  }

  minNode(node) {
    let current = node;
    while (current != null && current.left != null) {
      current = current.left;
    }
    return current;
  }

  /**
   * 返回树中最小的值/键
   */
  min() {
    return this.minNode(this.root);
  }

  maxNode(node) {
    let current = node;
    while (current != null && current.right != null) {
      current = current.right;
    }
    return current;
  }
  /**
   * 返回树中最大的值/键
   */
  max() {
    return this.maxNode(this.root);
  }

  removeNode(node, key) {
    if (node == null) {
      return null;
    }

    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      //第一种情况，是删除叶节点
      if (node.left == null && node.right == null) {
        node = null;
        return node;
        //第二种情况左子树为null
      } else if (node.left == null) {
        node = node.right;
        return node;
        //第三种情况右子树为null
      } else if (node.right == null) {
        node = node.left;
        return node;
        //第四种情况，左右子树都存在，需要找到右子树的自小节点或者左子树的最大节点来替换node
      } else {
        const aux = this.minNode(node.right);
        node.key = aux.key;
        node.right = this.removeNode(node.right, aux.key);
        return node;
      }
    }
  }

  /**
   * 从树中移除某个键
   * @param {*} key
   */
  remove(key) {
    this.root = this.removeNode(this.root, key);
  }
}
