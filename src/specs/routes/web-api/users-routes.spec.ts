// src/specs/routes/web-api/user-routes.spec.ts
import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
import { User } from '../../../entities/User'
import { server } from "../../../lib/fastify"
import { AppDataSource } from '../../../lib/typeorm'
import { cleanupWith } from '../../user.spec'

describe('/web-api/users', function () {

  before(async function () {
    await cleanupWith('deletion')
  })
    
  beforeEach(async function () {
    await cleanupWith('truncation')
  })

  describe('POST #create', function () {
    it('should register the user', async function () {

      const response = await server.inject({ url: `/web-api/users`, method: 'POST', payload: {
        firstName: "test",
        lastName: "test2",
        email: "test@test.com",
        password: "test",
        passwordConfirmation: "test"
      } })

      chai.expect(response.statusCode).equal(200)
      chai.expect(response.body).equal(`{"response":"user created"}`)
      
    })
  })

  describe('GET user /:id', function () {
    it('should find user', async function () {

      const user = AppDataSource.getRepository(User)

      const user1 = user.create({
        firstName : "A",
        lastName : "A",
        email : "same@email.com",
        age : 22,
      })

      await user.save(user1)

      const userInDatabase = await AppDataSource
            .getRepository(User)
            .createQueryBuilder()
            .select("user.id")
            .from(User, "user")
            .where("user.firstName = :firstName and user.lastName = :lastName and user.email = :email", user1)
            .getOne()

      const response = await server.inject({ url: `/web-api/users/` + userInDatabase?.id, method: 'GET'})      

      const responseJSON = JSON.parse(response.body)

      const supposedResponse = {
        id : userInDatabase?.id,
        firstName : 'A',
        lastName : 'A',
        email : 'same@email.com',
      }

      chai.expect(response.statusCode).equal(200)
      chai.expect(responseJSON.id).equal(supposedResponse.id)
      chai.expect(responseJSON.firstName).equal(supposedResponse.firstName)
      chai.expect(responseJSON.lastName).equal(supposedResponse.lastName)
      chai.expect(responseJSON.email).equal(supposedResponse.email)
    })
  })
})
