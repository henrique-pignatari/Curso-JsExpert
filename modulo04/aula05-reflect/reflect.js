'use strict'

const assert = require("assert")

const myObj = {
  add(myValue){
    return this.arg1 + this.arg2 + myValue
  }
}

assert.deepStrictEqual(myObj.add.apply({arg1: 10, arg2: 20}, [100]), 130)

myObj.add.apply = function (){ throw new TypeError("Injetou um trem")}

assert.throws(
  () => myObj.add.apply({},[]),
  {
    name: "TypeError",
    message: "Injetou um trem"
  }
)

const result = Reflect.apply(myObj.add, {arg1: 40, arg2: 20}, [200])
assert.deepStrictEqual(result, 260)

function Mydate(){

}

Object.defineProperty(Mydate, 'withObject', {value: () => 'ALO meu povo'})

Reflect.defineProperty(Mydate, 'withReflection', {value: () => 'ALO minha pova'})

assert.deepStrictEqual(Mydate.withObject(), 'ALO meu povo')
assert.deepStrictEqual(Mydate.withReflection(), 'ALO minha pova')

const wihtDelete = { user: 'Henrique'}
delete wihtDelete.user
assert.deepStrictEqual(wihtDelete.hasOwnProperty('user'), false)

const withReflection = {user: "Xuxa da silva"}
Reflect.deleteProperty(withReflection, "user")
assert.deepStrictEqual(withReflection.hasOwnProperty('user'), false)

assert.deepStrictEqual(1['userName'], undefined)
assert.throws(() => Reflect.get(1, "userName"), TypeError)

assert.ok('superman' in {superman: ''})
assert.ok(Reflect.has({batman: ''}, "batman"))

const user = Symbol('user')
const databaseUser = {
  id: 1,
  [Symbol.for('password')]: 123,
  [user]: 'henrique'
}

const objectKeys = [
  ...Object.getOwnPropertyNames(databaseUser),
  ...Object.getOwnPropertySymbols(databaseUser)
]

assert.deepStrictEqual(objectKeys, ['id', Symbol.for("password"), user])

assert.deepStrictEqual(Reflect.ownKeys(databaseUser), ['id', Symbol.for("password"), user])