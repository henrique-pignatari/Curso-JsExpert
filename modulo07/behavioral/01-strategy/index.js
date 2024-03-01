import ContextStrategy from "./src/base/contextStrategy.js"
import PostgresStrategy from "./src/strategies/postgresStrategy.js"
import MongoDBStrategy from "./src/strategies/mongoDBStrategy.js"

const postgresConnectionString = "postgres://henrique:senha123@localhost:5432/heroes"
const postgresContext = new ContextStrategy(new PostgresStrategy(postgresConnectionString))
await postgresContext.connect()

const mongoDBConnectionString = "mongodb://henrique:senha123@localhost:27017/heroes"
const mongoDBContext = new ContextStrategy(new MongoDBStrategy(mongoDBConnectionString))
await mongoDBContext.connect()

const data = [
    {
        name: "henrique",
        type: "transaction"
    },
    {
        name: "mariasilva",
        type: "activityLog"
    },
]

const contextTypes = {
    transaction: postgresContext,
    activityLog: mongoDBContext
}

for (const { name, type } of data) {
    const context = contextTypes[type]
    context.create({ name: name + Date.now() })

    console.log(type, context.dbStrategy.constructor.name)
    console.log(await context.read());
}