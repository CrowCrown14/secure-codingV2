// src/specs/entities/user.ts
import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
import { validate } from "class-validator"
import { QueryFailedError } from 'typeorm/error/QueryFailedError'
import { User } from '../entities/User'
import { ValidationError } from '../error/ValidationError'
import { AppDataSource } from '../lib/typeorm'

chai.use(chaiAsPromised)

describe('User', function () {
  before(async function () {
    // TODO: initialise the datasource (database connection)
    await AppDataSource.initialize()

  })
    
  beforeEach(async function () {
    // TODO: drop the content of the user table between each it().
    await AppDataSource.manager.clear(User) 

  })

  describe('validations', function () {

    it('should create a new User in database', async function () {
        
        const user = new User()
        user.firstName = "firstName"
        user.lastName = "lastName"
        user.email = "test@test.com"
        user.age = 25
        await AppDataSource.manager.save(user)
        
        const userInDatabase = await AppDataSource
            .getRepository(User)
            .createQueryBuilder()
            .select("user.firstName")
            .addSelect("user.id")
            .addSelect("user.lastName")
            .addSelect("user.email")
            .addSelect("user.age")
            .from(User, "user")
            .where("user.firstName = :firstName and user.lastName = :lastName and user.email = :email and user.age = :age ", user)
            .getOne()


        chai.expect(userInDatabase?.id).to.equal(user.id)
        chai.expect(userInDatabase?.firstName).to.equal(user.firstName)
        chai.expect(userInDatabase?.lastName).to.equal(user.lastName)
        chai.expect(userInDatabase?.email).to.equal(user.email)
        chai.expect(userInDatabase?.age).to.equal(user.age)
    })

    it('should raise error if email is missing', async function () {
      
      const user = AppDataSource.getRepository(User)

      const test = user.create({
        firstName : "firstName",
        lastName : "lastName",
        email : undefined,
        age : 25,
      })

      // const test = new User()
      // test.firstName = "firstName"
      // test.lastName = "lastName",
      // test.email = "",
      // test.age = 25
      
      // hint to check if a promise fails with chai + chai-as-promise:
      await chai.expect(user.save(test)).to.eventually
        .be.rejected.and.deep.include({
          target: test,
          property: 'email',
          constraints: { isEmail: 'email must be an email' }
        })
    })

    it('should raise error if 2 same email', async function () {
      
      const user = AppDataSource.getRepository(User)

      const user1 = user.create({
        firstName : "A",
        lastName : "A",
        email : "same@email.com",
        age : 22,
      })

      user.save(user1)

      const user2 = user.create({
        firstName : "B",
        lastName : "B",
        email : "same@email.com",
        age : 25,
      })

      await chai.expect(user.save(user2)).to.eventually.be.rejected
    })
  })
})