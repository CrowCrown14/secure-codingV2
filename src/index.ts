import { AppDataSource } from "./lib/typeorm"
import { User } from "./entities/User"
import { validate } from "class-validator"

// AppDataSource.initialize().then(async () => {

//     console.log("Loading users from the database...")
//     const users = await AppDataSource.manager.find(User)

//     if (users.length <= 0) {
//         console.log("Inserting a new user into the database...")
//         const user = new User()
//         user.firstName = "FirstNametest2"
//         user.lastName = "LastNametest2"
//         user.email = "test2@test.com"
//         user.age = 25
//         // await AppDataSource.manager.save(user)

//         const user2 = new User()
//         user2.firstName = "FirstNametest2"
//         user2.lastName = "LastNametest2"
//         user2.email = "test2@test.com"
//         user2.age = 25
//         // const res = await AppDataSource.manager.save(user2)

//         console.log("test")
//         console.log(await validate(user2))
//         console.log("fin test")
//         console.log("Saved a new user with id: " + user.id)
//     }

//     console.log("Loaded users: ", users)

// }).catch(error => console.log(error))


import { FASTIFY_ADDR, FASTIFY_PORT } from './lib/dotenv'
import { server } from './lib/fastify'

async function run() {
  await AppDataSource.initialize()

  

  await server.listen({ port: FASTIFY_PORT, host: FASTIFY_ADDR })
}

run().catch(console.error)