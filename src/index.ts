import { AppDataSource } from "./lib/typeorm"
import { User } from "./entities/User"

AppDataSource.initialize().then(async () => {

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)

    if (users.length <= 0) {
        console.log("Inserting a new user into the database...")
        const user = new User()
        user.firstName = "FirstNametest2"
        user.lastName = "LastNametest2"
        user.email = "test2@test.com"
        user.age = 25
        await AppDataSource.manager.save(user)
        console.log("Saved a new user with id: " + user.id)
    }

    console.log("Loaded users: ", users)

}).catch(error => console.log(error))
