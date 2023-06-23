const { describe, it } = require('mocha')
const { expect } = require('chai')

const mocks = {
  validCarCategory: require('./../mocks/valid-carCategory.json'),
  validCar: require('./../mocks/valid-car.json'),
  validCustomer: require('./../mocks/valid-customer.json'),
}

describe('Class validation Suite Tests', () => {
  describe('Car validation', () => { 
    it('for given id, name, releaseYear, available, gasAvailable it should throw an errror', () =>{
        const Car = require('./../../src/entities/Car')
        const mockCar = mocks.validCar

        const badfn = () => {
          new Car({
            ...mockCar,
            id:''
          })
        }
        expect(badfn).to.throw('Erro na validacao do Car')
    })
  })

  describe('CarCategory validation', () => { 
    it('for given id, name, carIds, price it should throw an errror', () =>{
        const CarCategory = require('./../../src/entities/CarCategory')
        const mockCarCategory = mocks.validCarCategory

        const badfn = () => {
          new CarCategory({
            ...mockCarCategory,
            id:''
          })
        }

        expect(badfn).to.throw('Erro na validacao do carCategory')
    })
  })

  describe('Customer validation', () => { 
    it('for given id, name, age it should throw an errror', () =>{
        const Customer = require('./../../src/entities/Customer')
        const mockCustomer = mocks.validCustomer

        const badfn = () => {
          new Customer({
            ...mockCustomer,
            id:''
          })
        }

        expect(badfn).to.throw('Erro na validacao do customer')
    })
  })
})