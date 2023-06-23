const carServiceFactory = require("./carServiceFactory")

const apiDependendciesFactory = () => {
  const carService = carServiceFactory()
  
  return{
    carService
  }

}

module.exports = apiDependendciesFactory