const items = new WeakMap();
class WeakMapStack {
  constructor() {
    items.set(this, []);
  }

  push(element) {
    items.get(this).push(element);
  }

  pop() {
    return items.get(this).pop();
  }

  //...
}
