const { expect } = require("chai")
const { it, describe } = require("mocha")
const { productValidator } = require(".//../src")
const Product = require("../src/entities/product")
const ProductDataBuilder = require("./model/productDataBuilder")

describe("Test Data Builder", () => {
    it("shouldn\'t return error with valid product", () => {
        const product = ProductDataBuilder.aProduct().build()
        const result = productValidator(product)

        const expected = {
            errors: [],
            result: true
        }

        expect(result).to.be.deep.equal(expected)
    })

    describe('Product validation Rules', () => {
        it('should return an object error when creating a product with invalid id', () => {
            const product = ProductDataBuilder.aProduct().withInvalidId().build()
            const result = productValidator(product)

            const expected = {
                errors: [`id: invalid length, current [1] expected to be between 2 and 20`],
                result: false
            }

            expect(result).to.be.deep.equal(expected)
        })

        it('should return an object error when creating a product with invalid name', () => {
            const product = ProductDataBuilder.aProduct().withInvalidName().build()
            const result = productValidator(product)

            const expected = {
                errors: [`name: invalid value, current [abc123] expected to hava only words`],
                result: false
            }

            expect(result).to.be.deep.equal(expected)
        })

        it('should return an object error when creating a product with invalid price', () => {
            const product = ProductDataBuilder.aProduct().withInvalidPrice().build()
            const result = productValidator(product)

            const expected = {
                errors: [`price: invalid value, current [2000] expected to be between 1 and 1000`],
                result: false
            }

            expect(result).to.be.deep.equal(expected)
        })

        it('should return an object error when creating a product with invalid category', () => {
            const product = ProductDataBuilder.aProduct().withInvalidCategory().build()
            const result = productValidator(product)

            const expected = {
                errors: [`category: invalid value, current [mecanico] expected to be either electronic or organic`],
                result: false
            }

            expect(result).to.be.deep.equal(expected)
        })
    })
})