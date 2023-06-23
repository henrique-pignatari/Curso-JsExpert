const Base = require('./base/Base')
const isNumber = require('./../helpers/isNumber')

class Customer extends Base{
  constructor({ id, name, age}){
    super({id, name})

    this.validate({ id, name, age})
    this.age = age
  }

  validate({ id, name, age}){
    if(
    !(id &&
      name &&
      isNumber(age)
    ))
    throw new Error('Erro na validacao do customer')
  }
}

module.exports = Customer