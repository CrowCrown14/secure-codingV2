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

  describe('Error 400', function () {
    it('should return about validation schema', async function () {

        const response = await server.inject({ url: `/web-api/users/`, method: 'POST'})
        
        const responseJSON = JSON.parse(response.body)

        chai.expect(response.statusCode).equal(400)
        chai.expect(responseJSON.error).equal('Validation schema is missing')
        chai.expect(responseJSON.message).equal('Validation schema is missing')
    })
  })
})