const Base = require('./base/Base')
const isNumber = require('./../helpers/isNumber')

class CarCategory extends Base{
  constructor({ id, name, carIds, price}){
    super({id, name})

    this.validate({ id, name, carIds, price})
    this.carIds = carIds;
    this.price = price;
  }

  validate({ id, name, carIds, price}){
    if(
    !(
      id &&
      name &&
      carIds.length > 0 &&
      isNumber(price)
    ))
      throw new Error('Erro na validacao do carCategory')
  }
}

module.exports = CarCategory