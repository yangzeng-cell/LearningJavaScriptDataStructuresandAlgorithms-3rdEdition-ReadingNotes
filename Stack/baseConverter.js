// 把十进制转换成基数为 2～36 的任意进制
import Stack from "./Stack.js";

function baseConverter(decNumber, base) {
  let dec = decNumber;
  let arr = new Stack();
  const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let str = "";
  if (!(base >= 2 && base <= 36)) {
    return str;
  }
  while (dec > 0) {
    arr.push(Math.floor(dec % base));
    dec = Math.floor(dec / base);
  }

  while (!arr.isEmpty()) {
    str += digits[arr.pop()];
  }

  return str;
}

console.log(baseConverter(100345, 2)); // 11000011111111001
console.log(baseConverter(100345, 8)); // 303771
console.log(baseConverter(100345, 16)); // 187F9
console.log(baseConverter(100345, 35)); // 2BW0
