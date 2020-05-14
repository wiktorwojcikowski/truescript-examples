import { Operation } from '../compiler';

test('compile not collision operations', () => {
  const s = "abcdefg";
  const op1 = new Operation([{ move: 1 }, { insert: "FOO" }]);
  const op2 = new Operation([{ move: 3 }, { insert: "BAR" }]);
  const combined1 = Operation.combine(op1, op2);
  const combined2 = Operation.combine(op2, op1);

  expect(combined2.apply(s)).toEqual(combined1.apply(s));
});

test('compile operations on the same position', () => {
  const s = "abcdefg";
  const op1 = new Operation([{ move: 1 }, { insert: "FOO" }]);
  const op2 = new Operation([{ move: 1 }, { insert: "BAR" }]);
  const combined1 = Operation.combine(op1, op2);
  const combined2 = Operation.combine(op2, op1);

  expect(combined2.apply(s)).not.toEqual(combined1.apply(s));
});

test('delete simple', () => {
  const s = "abcdefg";
  const op1 = new Operation([{ move: 1 }, { delete: 1 }]);
  const op2 = new Operation([{ move: 3 }, { delete: 2 }]);
  const str = Operation.combine(op1, op2).apply(s);

  expect(str).toEqual('acfg');
});

test('delete with collision', () => {
  const s = "abcdefg";
  const op1 = new Operation([{ move: 1 }, { delete: 3 }]);
  const op2 = new Operation([{ move: 3 }, { delete: 3 }]);
  const str = Operation.combine(op1, op2).apply(s);
  const str2 = Operation.combine(op2, op1).apply(s);

  expect(str).toEqual('ag');

});

