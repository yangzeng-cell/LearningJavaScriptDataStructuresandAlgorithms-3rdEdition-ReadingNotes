import { ValuePair } from "../linked-list-models";
import { defaultToString } from "../util";
/**
 * 基础版，相同的hashkey的话会被覆盖
 */
export default class HashTable {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }

  /**
   * 向散列表增加一个新的项（也能更新散列表）
   * @param {*} key
   * @param {*} value
   */
  put(key, value) {
    if (key == null || value == null) {
      return false;
    }

    const position = this.hashCode(key);

    this.table[position] = new ValuePair(position, value);

    return true;
  }
  // 根据键值从散列表中移除值
  remove(key) {
    const hash = this.hashCode[key];
    const valuePair = this.table[hash];

    if (valuePair != null) {
      delete this.table[hash];
      return true;
    }

    return false;
  }
  // 返回根据键值检索到的特定的值
  get(key) {
    const valuePair = thia.table[this.hashCode(key)];
    return valuePair == null ? undefined : valuePair.value;
  }

  loseloseHashCode(key) {
    if (typeof key === "number") {
      return key;
    }

    const tableKey = this.toStrFn(key);
    let hash = 0;
    for (let i = 0; i < tableKey.length; i++) {
      hash += this.tableKey.charCodeAt(tableKey[i]);
    }

    return hash % 37;
  }

  hashCode(key) {
    return this.loseloseHashCode(key);
  }
}
