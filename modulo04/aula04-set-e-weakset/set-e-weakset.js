const assert = require("assert")

const arr1 = ["0", "1", "2"]
const arr2 = ["2", "0", "3"]
const arr3 = arr1.concat(arr2)

assert.deepStrictEqual(arr3.sort(), ["0", "0", "1", "2", "2", "3"])

const set = new Set()
arr1.map(item => set.add(item))
arr2.map(item => set.add(item))

assert.deepStrictEqual(Array.from(set), ["0", "1", "2", "3"])

assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), ["0", "1", "2", "3"])

assert.ok(set.has('3'))

const users01 = new Set([
  'henrique',
  'mariazinha',
  'xuxa da silva'
])

const users02 = new Set([
  'joaozinho',
  'henrique',
  'julio'
])

const intersection = new Set([...users01].filter(user => users02.has(user)))
assert.deepStrictEqual(Array.from(intersection), ['henrique'])


const difference = new Set([...users01].filter(user => !users02.has(user)))
assert.deepStrictEqual(Array.from(difference), [ 'mariazinha', 'xuxa da silva' ])
