const faker = require('faker')
const { join } = require('path')
const { writeFile } = require('fs/promises')

const Car = require('../src/entities/Car.js')
const CarCategory = require('../src/entities/CarCategory.js')
const Customer = require('../src/entities/Customer.js')

const seederBaseFolder = join(__dirname, '../', 'database');
const ITEMS_AMOUNT = 2;

const cars = [];
const customers = [];

const carCategory = new CarCategory({
  id: faker.random.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount(20, 100)
});

for(let index = 0; index <= ITEMS_AMOUNT; index++){
  const car = new Car({
    id: faker.random.uuid(),
    name: faker.vehicle.model(),
    available: true,
    gasAvailable: true,
    releaseYear: faker.date.past().getFullYear()
  })
  carCategory.carIds.push(car.id);
  cars.push(car);

  const customer = new Customer({
    id: faker.random.uuid(),
    name: faker.name.findName(),
    age: faker.random.number({min: 18, max: 50})
  })
  customers.push(customer);
}

const write = (filename, data) => writeFile(join(seederBaseFolder, filename), JSON.stringify(data));

;(async ()=>{
  await write('cars.json', cars)
  await write('carCategories.json', [carCategory])
  await write('customers.json', [customers])
})()

