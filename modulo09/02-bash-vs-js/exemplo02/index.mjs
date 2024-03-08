$.verbose = false

import { setTimeout } from 'timers/promises'
import isSafe from 'safe-regex'

await $`sudo docker run -p "8080:80" -d nginx`
await setTimeout(500)
const req = await $`curl --silent localhost:8080`
console.log(`req\n`, req.stdout)

const containers = await $`sudo docker ps`

const exp = /(?<containerId>\w+)\W+(?=nginx)/

if (!isSafe(exp)) throw new Error('unsafe regex!!')

const { groups: { containerId } } = containers.toString().match(exp)

const logs = await $`sudo docker logs ${containerId}`
const rm = await $`sudo docker rm -f ${containerId}`

console.log(logs)
console.log(rm)
