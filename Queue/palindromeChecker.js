import Deque from "./Deque.js";
// 回文字符串检测
function palindromeChecker(aString) {
  if (aString == null || (aString != null && aString.length === 0)) {
    return false;
  }
  // 判断是否相等，不相等就返回
  let isEqual = true;
  // 获得第一个和最后一个字符
  let firstChar, lastChar;
  const deque = new Deque();
  // 先将字符串转成小写然后再去掉空格重新拼接
  aString = aString.toLocaleLowerCase().split(" ").join("");
  console.log(aString);
  for (let i = 0; i < aString.length; i++) {
    deque.addBack(aString.charAt(i));
  }
  // while循环拿到第一个和最后一个进行比较，只有在isEqual为true才继续比奥,只有一个的时候跳出
  while (deque.size() > 1 && isEqual) {
    firstChar = deque.removeFront();
    lastChar = deque.removeBack();

    if (lastChar !== firstChar) {
      isEqual = false;
    }
  }

  return isEqual;
}
// 全是true
console.log("a", palindromeChecker("a"));
console.log("aa", palindromeChecker("aa"));
console.log("kayak", palindromeChecker("kayak"));
console.log("level", palindromeChecker("level"));
console.log(
  "Was it a car or a cat I saw",
  palindromeChecker("Was it a car or a cat I saw")
);
console.log("Step on no pets", palindromeChecker("Step on no pets"));
