const assert = require('assert')

function* calculation(arg1, arg2){
  yield arg1 * arg2
}

function *main(){
  yield "hello"
  yield* calculation(10, 20)
}

const generator = main()

assert.deepStrictEqual(generator.next(), {value: 'hello', done: false})
assert.deepStrictEqual(generator.next(), {value: 200, done: false})
assert.deepStrictEqual(generator.next(), {value: undefined, done: true})

assert.deepStrictEqual(Array.from(main()), [ 'hello', 200 ])
assert.deepStrictEqual([...main()], [ 'hello', 200 ]) 

const { readFile, stat, readdir} = require('fs/promises')

function* promisified(){
  yield readFile(__filename)
  yield Promise.resolve('Hey Dude')
}

async function* systemInfo(){
  const file = await readFile(__filename)

  yield {file: file.toString()}

  const { size } = await stat(__filename)

  yield {size}

  const dir = await readdir(__dirname)
  yield {dir}
}

// Promise.all([...promisified()]).then(results => console.log('promisified', results))

// ;(async () => {
//   for await (const item of promisified()){
//     console.log('for await', item.toString())
//   }
// })()

;(async () => {
  for await (const item of systemInfo()){
    console.log('systemInfo', item)
  }
})()