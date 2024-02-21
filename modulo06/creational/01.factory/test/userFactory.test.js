const rewiremock = require('rewiremock/node')
const {deepStrictEqual} = require('assert')

const dbData = [{name: 'Maria'}, {name: 'Joao'}]

class MockDatabase{
    connect = () => this
    find = async (query) => dbData
}

rewiremock(() => require('./../src/util/database')).with(MockDatabase)

;(async () => {
    const expected = [{name: 'MARIA'}, {name: 'JOAO'}]
    
    rewiremock.enable()
    const UserFactory = require('../src/factory/userFactory')
    const userFactory = await UserFactory.createInstance()
    const result = await userFactory.find()
    deepStrictEqual(result, expected)
    rewiremock.disable()
})()