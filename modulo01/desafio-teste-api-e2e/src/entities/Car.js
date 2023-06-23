const Base = require('./base/Base')
const isNumber = require('./../helpers/isNumber')

class Car extends Base{
  constructor({id, name, releaseYear, available, gasAvailable}){
    super({id, name})

    this.validate({id, name, releaseYear, available, gasAvailable})
    this.releaseYear = releaseYear;
    this.available = available;
    this.gasAvailable = gasAvailable;
  }

  validate({id, name, releaseYear, available, gasAvailable}){
    if(
      !(
        id &&
        name &&
        releaseYear &&
        available !== undefined &&
        gasAvailable !== undefined        
      )
    )
    
    throw new Error('Erro na validacao do Car')
  }
}

module.exports = Car