import { Operation } from './compiler';

const s = "abcdefg";

console.log("");
console.log("No colission:");
console.log("==============");
const op1 = new Operation([{ move: 1 }, { insert: "FOO" }]);
const op2 = new Operation([{ move: 3 }, { insert: "BAR" }]);

console.log(op1.apply(s));
console.log(op2.apply(s));

const combined1 = Operation.combine(op1, op2);
const combined2 = Operation.combine(op2, op1);
console.log(combined1.apply(s), ' == ', combined2.apply(s));


console.log("");
console.log("With colission same place:");
console.log("==============");
const op3 = new Operation([{ move: 3 }, { insert: "FOO" }]);
const op4 = new Operation([{ move: 3 }, { insert: "BAR" }]);

const combined3 = Operation.combine(op3, op4);
const combined4 = Operation.combine(op4, op3);
console.log(combined3.apply(s), ' != ', combined4.apply(s));


console.log("");
console.log("Two overlap delete operations:");
console.log("==============");
const op5 = new Operation([{ move: 1 }, { delete: 3 }]);
const op6 = new Operation([{ move: 3 }, { delete: 3 }]);

const combined5 = Operation.combine(op5, op6);
const combined6 = Operation.combine(op6, op5);
console.log(combined5.apply(s), ' == ', combined6.apply(s));