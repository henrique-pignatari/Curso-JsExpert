const UserFactory = require("./factory/userFactory");

;(async () => {
    const userFactory = await UserFactory.createInstance()

    const result = await userFactory.find('a')
    console.log(result)
})()