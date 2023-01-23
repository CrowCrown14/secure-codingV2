// src/specs/routes/web-api/user-routes.spec.ts
import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
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
})
