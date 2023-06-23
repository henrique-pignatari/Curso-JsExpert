const CarService = require('../service/CarService')
const path = require('path')

const carServiceFactory = () => {
  const myPath = path.resolve(__dirname, '../', '../', 'database', 'cars.json')

  return new CarService({
      cars: myPath
    })
  
}

module.exports = carServiceFactory