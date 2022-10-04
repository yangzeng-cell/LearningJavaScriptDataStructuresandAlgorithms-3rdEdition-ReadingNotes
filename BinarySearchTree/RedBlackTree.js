// 在红黑树中，每个节点都遵循以下规则：
// (1) 顾名思义，每个节点不是红的就是黑的；
// (2) 树的根节点是黑的；
// (3) 所有叶节点都是黑的（用 NULL 引用表示的节点）；
// (4) 如果一个节点是红的，那么它的两个子节点都是黑的；
// (5) 不能有两个相邻的红节点，一个红节点不能有红的父节点或子节点；
// (6) 从给定的节点到它的后代节点（NULL 叶节点）的所有路径包含相同数量的黑色节点

import { Compare, defaultCompare } from "../util.js";
import BinarySearchTree, { Node } from "./index.js";

class RedBlackNode extends Node {
  constructor(key) {
    super(key);
    this.key = key;
    this.color = Colors.RED;
    this.parent = null;
  }
}

export const Colors = {
  RED: 1,
  BLACK: 2,
};
export default class RedBlackTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
    this.compareFn = compareFn;
    this.root = null;
  }

  isRed() {
    return this.color === Colors.isRed;
  }
  insert(key) {
    this.root = this.insertNode(this.root, key);
  }

  insertNode(node, key) {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left == null) {
        node.left = new RedBlackNode(key);
        node.left.parent = node;
        return node.left;
      } else {
        return this.insertNode(node.left, key);
      }
    }

    if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      if (node.right == null) {
        node.right = new RedBlackNode(key);
        node.right.parent = node;
        return node.right;
      } else {
        return this.insertNode(node.right, key);
      }
    }
  }

  fixTreeProperties(node) {
    while (
      node &&
      node.parent &&
      node.parent.color.isRed() &&
      node.color !== Colors.BLACK
    ) {
      let parent = node.parent;
      const grendparent = parent.parent;
      // 情形 A1：父节点是左侧子节点
      if (grendparent && grendparent.left === parent) {
        const uncle = grendparent.right;
        if (uncle && uncle.color === Colors.RED) {
          grendparent.color = Colors.RED;
          uncle.color = Colors.BLACK;
          parent.color = Colors.BLACK;
          node = grendparent;
        } else {
          // 情形 2A：节点是右侧子节点——左旋转
          if (node === parent.right) {
            this.rotationRR(parent);
            node = parent;
            parent = node.parent;
          }
          // 情形 3A：节点是左侧子节点——右旋转
          this.rotationLL(grendparent);
          parent.color = Colors.BLACK;
          grendparent.color = Colors.RED;
          node = parent;
        }
      } else {
        const uncle = grendparent.left;
        if (uncle && uncle.color === Colors.RED) {
          grendparent.color = Colors.RED;
          uncle.color = Colors.BLACK;
          parent.color = Colors.BLACK;
          node = grendparent;
        } else {
          // 情形 2B：节点是左侧子节点——右旋转
          if (node === parent.left) {
            this.rotationLL(parent);
            node = parent;
            parent = node.parent;
          }
          // 情形 3B：节点是右侧子节点——左旋转
          this.rotationRR(grendparent);
          parent.color = Colors.BLACK;
          grendparent.color = Colors.RED;
          node = parent;
        }
      }
    }
    this.root.color = Colors.BLACK;
  }

  rotationLL(node) {
    const temp = node.left;
    node.left = temp.right;
    if (temp.right && temp.right.key) {
      temp.right.parent = node;
    }
    temp.parent = node.parent;
    if (!node.parent) {
      this.root = temp;
    } else {
      if (node === node.parent.left) {
        node.parent.left = temp;
      } else {
        node.parent.right = temp;
      }
    }
    temp.right = node;
    node.parent = temp;
  }

  rotationRR(node) {
    const temp = node.right;
    node.right = temp.left;
    if (temp.left && temp.left.key) {
      temp.left.parent = node;
    }
    temp.parent = node.parent;
    if (!node.parent) {
      this.root = temp;
    } else {
      if (node === node.parent.left) {
        node.parent.left = temp;
      } else {
        node.parent.right = temp;
      }
    }
    temp.right = node;
    node.parent = temp;
  }
}
