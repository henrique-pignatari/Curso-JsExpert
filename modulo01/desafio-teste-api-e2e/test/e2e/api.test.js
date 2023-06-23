const { describe, it, before } = require('mocha')
const { expect } = require('chai')
const request = require('supertest')
const sinon = require('sinon')
const path = require('path')
const CarService = require('./../../src/service/CarService')
const Customer = require('./../../src/entities/Customer')
const Car = require('./../../src/entities/Car')
const SERVER_TEST_PORT = 4000

const mocks = {
  validCar: require('../mocks/valid-car.json'),
  validCarCategory: require('../mocks/valid-carCategory.json'),
  validCustomer: require('../mocks/valid-customer.json')
}

describe('End-2-End API Suite test', () => {
  let app = {}
  let sandbox = {}

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  before(()=>{
    const api = require('../../src/api')

    const instance = api()

    app ={
      instance,
      server: instance.init(SERVER_TEST_PORT)
    }
  })

  describe('/getAvailableCar:post', () => {
    it('given a carCategory it should return an available car', async () => {
      const car = mocks.validCar
      const carCategory = {
        ...mocks.validCarCategory,
        carIds: [car.id]
      }

      const expected = {
        result: car
      }

      const response = await request(app.server)
      .post('/getAvailableCar')
      .send(carCategory)
      .expect(200)

      expect(response.body).to.be.deep.equal(expected)
    })

    it('given a carCategory it should return an error', async () => {
      const car = mocks.validCar
      const carCategory = {
        ...mocks.validCarCategory,
        carIds: []
      }

      const response = await request(app.server)
      .post('/getAvailableCar')
      .send(carCategory)
      .expect(500)
    })
  })

  describe('/calculateFinalPrice:post', () => {
    it('given a carCategory, customer and numberOfDays it should calculate final amount in real',
    async ()=>{
      const customer = {
        ...mocks.validCustomer,
        age: 50
      }

      const carCategory = {
        ...mocks.validCarCategory,
        price: 10
      }

      const numberOfDays = 5

      const body = {
        customer,
        carCategory,
        numberOfDays
      }

      const expected = {
        result: app.instance.carService.currencyFormat.format(65)
      }

      const response = await request(app.server)
      .post('/calculateFinalPrice')
      .send(body)
      .expect(200)

      expect(response.body).to.be.deep.equal(expected)
    })

    it('given a carCategory, customer and numberOfDays it should return an error',
    async ()=>{
      const customer = {
        ...mocks.validCustomer,
        age: 50
      }

      const carCategory = {
        ...mocks.validCarCategory,
        price: 10
      }

      const numberOfDays = -1

      const body = {
        customer,
        carCategory,
        numberOfDays
      }

      const response = await request(app.server)
      .post('/calculateFinalPrice')
      .send(body)
      .expect(500)
    })
  })

  describe('/rent:post', () => {
    it('given a customer and a carCategory it should return a transaction receipt', async () => {
      const car = mocks.validCar
      const carCategory = {
        ...mocks.validCarCategory,
        price: 10,
        carIds: [car.id]
      }

      const customer = {
        ...mocks.validCustomer,
        age: 50
      }

      const numberOfDays = 5

      const body = {
        customer,
        carCategory,
        numberOfDays
      }

      const expectedStructure = {
        result: {
          customer,
          car,
          amount: 0,
          dueDate: new Date()
        }
      }

      const response = await request(app.server)
      .post('/rent')
      .send(body)
      .expect(200)

      const getKeys = obj => Object.keys(obj)

      expect(getKeys(response.body)).to.be.deep.equal(getKeys(expectedStructure))
      const { result } = response.body
      const expectedCustumer = new  Customer(result.customer)
      const expectedCar = new Car(result.car)

      expect(result.customer).to.be.deep.equal(expectedCustumer)
      expect(result.car).to.be.deep.equal(expectedCar)
      expect(result.amount).to.not.be.empty
      expect(result.dueDate).to.not.be.empty
    })

    it('given a customer and a carCategory it should return an error', async () => {
      const car = mocks.validCar
      const carCategory = {
        ...mocks.validCarCategory,
        price: 10,
        carIds: [car.id]
      }

      const customer = {
        ...mocks.validCustomer,
        age: 50
      }

      const numberOfDays = 0

      const body = {
        customer,
        carCategory,
        numberOfDays
      }

      const expectedStructure = {
        result: {
          customer,
          car,
          amount: 0,
          dueDate: new Date()
        }
      }

      const response = await request(app.server)
      .post('/rent')
      .send(body)
      .expect(500)
    })
  })

  describe('/any:get', () => {
    it('given any route it should return a default behavior', async ()=>{
      const response = await request(app.server)
      .get('/any')
      .expect(200)
    })
  })
})