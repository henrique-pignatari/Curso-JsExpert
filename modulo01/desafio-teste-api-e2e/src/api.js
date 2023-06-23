const http = require('http')
const apiDependendciesFactory = require('./factories/apiDependendciesFactory')
const CarCategory = require('./entities/CarCategory')
const Customer = require('./entities/Customer')

const DEFAULT_PORT = 3000
const DEFAULT_HEADERS = {
  'Content-Type': 'aplication/json'
}

class Api{
  constructor(dependencies = apiDependendciesFactory()){
    this.carService = dependencies.carService
  }

  generateRoutes(){
    return {
      '/rent:post': async (request, response) => {
        for await (const data of request){
          try{
            const { customer, carCategory, numberOfDays} = JSON.parse(data)

            const validatedCustomer = new Customer(customer)
            const validatedCarCategory = new CarCategory(carCategory)

            if(!numberOfDays > 0)
              throw new Error('O numero de dias dever ser maior do que zero')

            const result = await this.carService.rent(validatedCustomer, validatedCarCategory, numberOfDays)

            response.writeHead(200, DEFAULT_HEADERS)
            response.write(JSON.stringify({result}))
            response.end()

          } catch (error){
            response.writeHead(500, DEFAULT_HEADERS)
            response.write(JSON.stringify({error: error.message}))
            response.end()
          }
        }
      },

      '/calculateFinalPrice:post': async (request, response) => {
        for await (const data of request){
          try{
            const { customer, carCategory, numberOfDays} = JSON.parse(data)

            const validatedCustomer = new Customer(customer)
            const validatedCarCategory = new CarCategory(carCategory)

            if(!(numberOfDays > 0))
              throw new Error('O numero de dias dever ser maior do que zero')
              
          
            const result = await this.carService.calculateFinalPrice(validatedCustomer, validatedCarCategory, numberOfDays)

            response.writeHead(200, DEFAULT_HEADERS)

            response.write(JSON.stringify({ result }))
            response.end()

          } catch (error) {
            response.writeHead(500, DEFAULT_HEADERS)
            response.write(JSON.stringify({error: error.message}))
            response.end()
          }
        }
      },

      '/getAvailableCar:post': async (request, response) => {
        for await (const data of request) {
          try {
            const carCategory = JSON.parse(data)
            
            const validatedCarCategory = new CarCategory(carCategory)

            const result = await this.carService.getAvailableCar(validatedCarCategory)

            response.writeHead(200, DEFAULT_HEADERS)

            response.write(JSON.stringify({ result }))
            response.end()

          } catch (error) {
            response.writeHead(500, DEFAULT_HEADERS)
            response.write(JSON.stringify({error: error.message}))
            response.end()
          }
        }
      },

      default: (request, response) => {
        response.write(JSON.stringify({ success: 'Hello World!' }))
        return response.end();
      },
    }
  }

  handler(request, response) {
    const { url, method } = request
    const routeKey = `${url}:${method.toLowerCase()}`

    const routes = this.generateRoutes()
    const chosen = routes[routeKey] || routes.default

    response.writeHead(200, DEFAULT_HEADERS)

    return chosen(request, response)
  }

  /* istanbul ignore next */
  init(port = DEFAULT_PORT){
    const app = http.createServer(this.handler.bind(this))
    .listen(port, _ => console.log('App running at', port))

    return app
  }
}

/* istanbul ignore next */
if(process.env.NODE_ENV !== 'test'){
  const api = new Api()
  api.init()
}

module.exports = (dependencies) => new Api(dependencies)