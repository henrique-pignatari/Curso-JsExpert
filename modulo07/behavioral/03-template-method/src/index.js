import OrderBusiness from "./business/orderBusiness.js";
import Order from "./entities/order.js";

const order = new Order({
    costumerId: 'abc123',
    amount: 200,
    products: [{ description: 'teste' }]
})

const orderBusiness = new OrderBusiness()

console.info('OrderCreated', orderBusiness.create(order))