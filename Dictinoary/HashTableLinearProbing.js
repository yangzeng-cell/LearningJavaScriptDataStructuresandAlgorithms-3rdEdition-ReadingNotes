import { defaultToString } from "../util";
import LinkedList from "../LinkedList/LinkedList";
import { ValuePair } from "../linked-list-models";

export default class HashTableLinearProbing {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
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

  //另外一种散列函数
  djb2HashCode(key) {
    const tableKey = this.toStrFn(key);

    let hash = 5381;

    for (let i = 0; i < tableKey.length; i++) {
      hash = hash * 33 + tableKey.charCodeAt(i);
    }
    return hash % 1013;
  }

  hashCode(key) {
    return this.loseloseHashCode(key);
  }

  put(key, value) {
    if (key != null && value != null) {
      const position = this.hashCode(key);
      if (!this.table[position]) {
        this.table[position] = new ValuePair(key, value);
      } else {
        let index = position + 1;
        while (this.table[index]) {
          index++;
        }
        this.table[index] = new ValuePair(key, value);
      }
      return true;
    }
    return false;
  }

  get(key) {
    const position = this.hashCode(key);
    if (!this.table[position]) {
      if (this.table[position].key === key) {
        return this.table[position].value;
      } else {
        let index = position + 1;
        while (this.table[index] != null && this.table[index].key !== key) {
          index++;
        }
        if (this.table[index] != null && this.table[index].key === key) {
          return this.table[index].value;
        }
      }
    }

    return undefined;
  }

  remove(key) {
    const position = this.hashCode(key);

    if (!this.table[position]) {
      if (this.table[position].key === key) {
        delete this.table[position];
        this.verifyRemoveSideEffect(key, position);
        return true;
      } else {
        let index = position + 1;
        while (this.table[index] != null && this.table[index].key !== key) {
          index++;
        }
        if (this.table[index] != null && this.table[index].key === key) {
          delete this.table[index];
          this.verifyRemoveSideEffect(key, index);
          return true;
        }
      }
    }
    return false;
  }

  verifyRemoveSideEffect(key, removedPosition) {
    const hash = this.hashCode(key);

    let index = removedPosition + 1;

    while (this.table[index] != null) {
      const posHash = this.table[this.table[index].key];

      if (posHash <= hash || posHash <= removedPosition) {
        this.table[removedPosition] = this.table[index];
        delete this.table[index];

        removedPosition = index;
      }
      index++;
    }
  }
}
