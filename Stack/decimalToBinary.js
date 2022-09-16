// 将十进制转成二进制
import Stack from "./Stack.js";
function decimalToBinary(decNumber) {
  decNumber = Math.floor(Number(decNumber));
  const stack = new Stack();

  let dec = decNumber;

  while (dec > 0) {
    console.log(Math.floor(dec % 2));
    stack.push(dec % 2);
    dec = Math.floor(dec / 2);
  }
  let binaryString = "";
  while (!stack.isEmpty()) {
    binaryString += stack.pop().toString();
  }
  return binaryString;
}

console.log(decimalToBinary(233)); // 11101001
console.log(decimalToBinary(10)); // 1010
console.log(decimalToBinary(1000)); // 1111101000
