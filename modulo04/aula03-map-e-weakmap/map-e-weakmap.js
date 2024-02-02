const assert = require('assert')
const { constrainedMemory } = require('process')
const myMap = new Map()

myMap
  .set(1,'one')
  .set('Henrique', {text: 'two'})
  .set(true, () => 'hello')

const myMapWithConstructior = new Map([
  ['1', 'str1'],
  [1, 'num1'],
  [true, 'bool1']
])

// console.log('myMap', myMap)
// console.log('myMap.get(1)', myMap.get(1))

assert.deepStrictEqual(myMap.get(1), 'one')
assert.deepStrictEqual(myMap.get('Henrique'), {text: 'two'})
assert.deepStrictEqual(myMap.get(true)(), 'hello')

const onlyReferenceWorks = {id: 1}
myMap.set(onlyReferenceWorks, { name: 'Henrique'})

// console.log('get', myMap.get(onlyReferenceWorks))

assert.deepStrictEqual(myMap.get({id: 1}), undefined)
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'Henrique'})

assert.deepStrictEqual(myMap.size, 4)

assert.ok(myMap.has(onlyReferenceWorks))

assert.ok(myMap.delete(onlyReferenceWorks))

assert.deepStrictEqual(JSON.stringify([...myMap]), '[[1,"one"],["Henrique",{"text":"two"}],[true,null]]')

// for (const [key, value] of myMap){
//   console.log({key, value})
// }

const actor = {
  name: 'Xuxa da Silva',
  toString: 'Queen: Xuxa da Silva'
}

myMap.set(actor)

assert.ok(myMap.has(actor))
assert.throws(() => myMap.get(actor).toString, TypeError)

myMap.clear()
assert.deepStrictEqual([...myMap.keys()], [])