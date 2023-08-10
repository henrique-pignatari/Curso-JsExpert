9999999999999999;
// -> 10000000000000000

true + 2;
// -> 3

"21" + true;
// -> '21true'

"21" - true;
// -> 20

"21" - -1;
// -> 22

0.1 + 0.2 === 0.3;
// -> false

3 > 2 > 1;
// -> false

3 > 2 >= 1;
// -> true

"B" + "a" + +"a" + "a";
// -> BaNaNa

console.assert(String(123) === "123", "explicit convertion to string");
console.assert(123 + "" === "123", "implicit convertion to string");

console.assert(
  ("hello" || 123) === "hello",
  "|| returns the first element if both are true!"
);
console.assert(("hello" && 123) === 123, "&& returns the last element!");

// --------------
const item = {
  name: "ErickWendel",
  age: 25,

  toString() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },

  valueOf() {
    return { hey: "dude" };
    // return 007
  },

  [Symbol.toPrimitive](coercionType) {
    const types = {
      string: JSON.stringify(this),
      number: "0007",
    };

    return types[coercionType] || types.string;
  },
};

console.assert(item + 0 === '{"name":"ErickWendel","age":25}0');
// console.log('!!item is true?', !!item)
console.assert(!!item);

// console.log('string.concat', 'Ae'.concat(item))
console.assert("Ae".concat(item) === 'Ae{"name":"ErickWendel","age":25}');

// console.log('implicit + explicit coercion (using ==)', item == String(item))
console.assert(item == String(item));

const item2 = { ...item, name: "Zézin", age: 20 };
// console.log('New Object', item2)
console.assert(item2.name === "Zézin" && item2.age === 20);
