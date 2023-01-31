import * as chai from 'chai'
import { server } from "../../../lib/fastify"

describe('Error', function () {

  describe('Error 500', function () {
    it('should return custom error', async function () {

        const response = await server.inject({ url: `/web-api/users/`, method: 'GET'})
        
        const responseJSON = JSON.parse(response.body)

        chai.expect(response.statusCode).equal(500)
        chai.expect(responseJSON.error).equal('Internal Server Error')
        chai.expect(responseJSON.message).equal('Internal Server Error')
    })
  })
})