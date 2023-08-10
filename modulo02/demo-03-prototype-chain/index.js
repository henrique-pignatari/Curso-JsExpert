const assert = require("assert");
const obj = {};
const arr = [];
const fn = () => {};

console.log("new Object() is {}? ", new Object().__proto__ === {}.__proto__);
assert.deepStrictEqual(new Object().__proto__, {}.__proto__);

console.log(
  "obj.__proto__ === Object.prototype",
  obj.__proto__ === Object.prototype
);
console.log("\n");

// prototype de um objeto é um object literal de um objeto
console.log("{}.__proto__ => ", {}.__proto__);
console.log(`{nome: ${"random"}}.__proto__ => `, { nome: "random" }.__proto__);

// prototype de um object litereal é null
console.log("{}.__proto__.__proto__ => ", {}.__proto__.__proto__);
console.log("\n");

function Employee() {}

Employee.prototype.salary = () => "salary";

console.log("Salario funcionario", Employee.prototype.salary());

function Supervisor() {}
Supervisor.prototype = Object.create(Employee.prototype);
Supervisor.prototype.profitShare = () => "profitShare";

console.log("Salario supervisor", Supervisor.prototype.salary());

function Manager() {}
Manager.prototype = Object.create(Supervisor.prototype);
Manager.prototype.monthlyBonuses = () => "monthlyBonuses";

console.log("\n");

console.log(
  "Sem instanciar uma classe utilizando new, metodos dos __proto__ herdados não são acessiveis",
  Manager.salary
);

console.log("__proto__ de uma instacia de Manager", new Manager().__proto__);

console.log(
  "Metodo salary invocado diretamente em new Manager().salary() ==>",
  new Manager().salary()
);

console.log("\n");

const manager = new Manager();

console.log("manager.salary()", manager.salary());
console.log("manager.profitShare()", manager.profitShare());
console.log("manager.monthlyBonuses()", manager.monthlyBonuses());

console.log("\n");
