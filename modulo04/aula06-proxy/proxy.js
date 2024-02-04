'use strict'

const Event = require('events')
const event = new Event()
const eventName = 'counter'
event.on(eventName, msg => console.log('counter updated', msg))

const myCounter = {
  counter: 0
}

const  proxy = new Proxy(myCounter, {
  set: (target, propertyKey, newValue) => {
    event.emit(eventName, {newValue, key: target[propertyKey]})
    target[propertyKey] = newValue
    return true
  },

  get: (Object, prop) => {
    // console.log('Chamou!', { Object, prop})
    return Object[prop]
  }
})

setInterval(function (){
  console.log('[3]: Interval')
  proxy.counter += 1

  if(proxy.counter === 10) clearInterval(this)
}, 200)

setTimeout(() => {
  console.log('[2]: timeout')
  proxy.counter = 4
}, 100)

setImmediate(() => {
  console.log('[1]: setImmediate', proxy.counter)
})

process.nextTick(() => {
  console.log('[0]: nextTick')
  proxy.counter = 2
})