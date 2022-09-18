import { valuePair } from "../linked-list-models.js";
import { defaultToString } from "../util.js";

class Dictionary {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }
  /**
   * 向字典中添加新元素。如果 key 已经存在，那么已存在的 value 会 被新的值覆盖。
   * @param {*} key
   * @param {*} value
   */
  set(key, value) {
    if (key != null && value != null) {
      this.table[this.toStrFn(key)] = new valuePair(key, value);
      return true;
    }
    return false;
  }
  //通过使用键值作为参数来从字典中移除键值对应的数据值
  remove(key) {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)];
      return true;
    }
    return false;
  }

  // 如果某个键值存在于该字典中，返回 true，否则返回 false
  hasKey(key) {
    return this.table[this.toStrFn(key)] != null;
  }

  //  通过以键值作为参数查找特定的数值并返回
  get(key) {
    const valuePair = this.table[this.toStrFn[key]];

    return valuePair == null ? "undefined" : valuePair.value;
  }

  //删除该字典中的所有值
  clear() {
    this.table = {};
  }

  //返回字典所包含值的数量。与数组的 length 属性类似
  size() {
    return Object.keys(this.table).length;
  }

  //在 size 等于零的时候返回 true，否则返回 false

  isEmpty() {
    return this.size() === 0 ? true : false;
  }

  // 将字典所包含的所有键名以数组形式返回
  keys() {
    return this.keyValues().map((valuePair) => valuePair.key);
  }

  // 将字典所包含的所有数值以数组形式返回
  values() {
    return this.keyValues().map((valuePair) => valuePair.value);
  }

  //将字典中所有[键，值]对返回
  keyValues() {
    // return Object.values(this.table);
    const valuePairs = [];

    for (let key in this.table) {
      if (this.hasKey(key)) {
        valuePairs.push(this.table[key]);
      }
    }

    return valuePairs;
  }

  //迭代字典中所有的键值对。callbackFn 有两个参数:key 和value。该方法可以在回调函数返回 false 时被中止(和 Array 类中的 every 方法相似)。
  foreach(callbackFN) {
    const valuePairs = this.keyValues();

    for (let i = 0; i < valuePairs.length; i++) {
      const result = callbackFN(valuePairs[i].key, valuePairs[i].value);
      if (result === false) {
        break;
      }
    }
  }

  toString() {
    if (this.isEmpty()) {
      return "";
    }

    const valuePairs=this.keyValues()
    let str=valuePairs[0].toString()
    for(let i=0=1;i<valuePairs.length;i++){
      str+=`,${valuePairs[i].toString()}`
    }
    return str
  }

}
