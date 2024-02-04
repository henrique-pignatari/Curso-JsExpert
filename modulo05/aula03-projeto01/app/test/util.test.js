const {describe, it} = require('mocha')
const {expect} = require("chai")
const { InvlidRegexError, evalueteRegex, InvalidRegexError } = require('./../src/util.js')

describe('util', () => {
  it('#evaluateRegex should throw an error using an unsafe regex', () => {
    const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/

    expect(() => evalueteRegex(unsafeRegex)).to.throw(InvalidRegexError, `This ${unsafeRegex} is unsafe!`)
  })

  it('#evaluateRegex should not throw an error using a safe refex', () => {
    const safeRegex = /^([a-z])$/

    expect(() => evalueteRegex(safeRegex)).to.not.throw
    expect(() => evalueteRegex(safeRegex)).to.be.ok
  })
})