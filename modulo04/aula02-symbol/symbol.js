const assert = require("assert")

const uniqueKey = Symbol("userName")
const user = {}

user["userName"] = 'value for normal Objects'
user[uniqueKey] = 'value for symbol'

// console.log('getting normal object: ', user.userName)
// console.log('getting from new symbol key: ', user[Symbol("userName")])
// console.log('getting form symbol unique key: ', user[uniqueKey])

assert.deepStrictEqual(user.userName, 'value for normal Objects')

assert.deepStrictEqual(user[Symbol("userName")], undefined)
assert.deepStrictEqual(user[uniqueKey], 'value for symbol')

assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey)

//Pessima pratica
user[Symbol.for("password")] = 123
assert.deepStrictEqual(user[Symbol.for("password")], 123)

//Well known symbols
const obj = {
  [Symbol.iterator]: () => ({
    items: ['c', 'b', 'a'],
    next(){
      return{
        done: this.items.length === 0,
        value: this.items.pop()
      }
    }
  })
}

// for( const item of obj){
//   console.log('item', item)
// }


assert.deepStrictEqual([...obj], ['a', 'b', 'c'])

const kItems = Symbol("kItems")

class MyDate {
  constructor(...args){
    this[kItems] = args.map(arg => new Date(...arg))
  }

  [Symbol.toPrimitive](coertionType){
    if(coertionType !== 'string') throw new TypeError()

    const itens = this[kItems].map(
      item=>{
        return new Intl
        .DateTimeFormat('pt-br', {
          month: "long",
          day: "2-digit",
          year: "numeric"
        })
        .format(item)
      }
    )

    return new Intl.ListFormat("pt-BR", {
      style: "long",
      type: "conjunction"
    })
    .format(itens)
  }

  *[Symbol.iterator](){
    for ( const item of this[kItems]){
      yield item
    }
  }

  async *[Symbol.asyncIterator](){
    const timeout = ms => new Promise(r => setTimeout(r, ms))
    for(const item of this[kItems]){
      await timeout(100)
      yield item.toISOString()
    }
  }

  get [Symbol.toStringTag](){
    return "MyDate"
  }
}

const myDate = new MyDate(
  [2020, 3, 1],
  [2018, 2, 2]

)

const expectedDates = [
  new Date(2020, 3, 1),
  new Date(2018, 2, 2),
]

assert.deepStrictEqual(Object.prototype.toString.call(myDate), '[object MyDate]')
assert.throws(() => myDate + 1, TypeError)
assert.deepStrictEqual(String(myDate), '01 de abril de 2020 e 02 de março de 2018')
assert.deepStrictEqual([...myDate], expectedDates)

;(async () => {
  const dates = await Promise.all([...myDate])
  assert.deepStrictEqual(dates, expectedDates)
})()