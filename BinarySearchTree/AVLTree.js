import { Compare, defaultCompare } from "../util.js";
import BinarySearchTree from "./index.js";
import { Node } from "./index.js";
export const BalancerFactor = {
  UNBALANCED_RIGHT: 1,
  SLIGHTLY_UNBALANCED_RIGHT: 2,
  BALANCED: 3,
  SLIGHTLY_UNBALANCED_LEFT: 4,
  UNBALANCED_LEFT: 5,
};

//avl树就是自平衡二叉树，就是节点的左右子树的高度差不会超过1
export default class AVLTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
  }

  insert(key) {
    this.root = this.insertNode(this.root, key);
  }

  insertNode(node, key) {
    //当这棵树是空树的时候
    if (node == null) {
      return new Node(key);
      //小于向前节点
    } else if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.insertNode(node.left, key);
      //大于当前节点
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.insertNode(node.right, key);
    } else {
      //和当前节点值相同时
      return node;
    }

    //判断是否平衡
    const balancerFactor = this.getBalanceFactor(node);

    if (balancerFactor === BalancerFactor.UNBALANCED_LEFT) {
      if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
        node = this.rotationLL(node);
      } else {
        node = this.rotationLR(node);
      }
    }

    if (balancerFactor === BalancerFactor.UNBALANCED_RIGHT) {
      if (this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) {
        node = this.rotationRR(node);
      } else {
        node = this.rotationRL(node);
      }
    }

    return node;
  }

  removeNode(node, key) {
    node = super.removeNode(node, key);

    if (node == null) {
      //空树也是平衡树
      return node;
    }

    const balancerFactor = this.getBalanceFactor(node);
    if (balancerFactor === BalancerFactor.UNBALANCED_LEFT) {
      const balancerFactorLeft = this.getBalanceFactor(node.left);
      if (
        balancerFactorLeft === BalancerFactor.UNBALANCED_LEFT ||
        balancerFactorLeft === BalancerFactor.SLIGHTLY_UNBALANCED_LEFT
      ) {
        return this.rotationLL(node);
      }
      if (balancerFactorLeft === BalancerFactor.SLIGHTLY_UNBALANCED_RIGHT) {
        return this.rotationLR(node.left);
      }
    }

    if (balancerFactor === BalancerFactor.UNBALANCED_RIGHT) {
      const balancerFactorRight = this.getBalanceFactor(node.right);
      if (
        balancerFactorRight === BalancerFactor.UNBALANCED_RIGHT ||
        balancerFactorRight === BalancerFactor.SLIGHTLY_UNBALANCED_RIGHT
      ) {
        return this.rotationRR(node);
      }

      if (balancerFactorRight === BalancerFactor.SLIGHTLY_UNBALANCED_LEFT) {
        return this.rotationRL(node.right);
      }
    }
    return node;
  }

  // 计算一个节点高度
  getNodeHeight(node) {
    if (node == null) {
      return -1;
    }

    return Math.max(
      this.getNodeHeight(node.left),
      this.getNodeHeight(node.right)
    );
  }

  // 计算一个节点的平衡因子并返回其值
  getBalanceFactor(node) {
    const heightDifference =
      this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
    switch (heightDifference) {
      case -2:
        break;

      default:
        break;
    }
  }

  // 左左（LL）：向右的单旋转
  rotationLL(node) {
    const temp = node.left;
    node.right = temp.left;
    temp.right = node;

    return temp;
  }

  rotationRR(node) {
    const temp = node.right;
    node.left = temp.right;
    temp.left = node;
    return temp;
  }

  rotationLR(node) {
    node.left = this.rotationRR(node.left);
    return this.rotationLL(node);
  }

  rotationRL(node) {
    node.right = this.rotationLL(node.right);
    return this.rotationRR(node);
  }
}
