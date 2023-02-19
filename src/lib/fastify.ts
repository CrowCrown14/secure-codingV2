import fastify, { RouteOptions } from "fastify";
import { userRoutes } from "../routes/web-api/users-routes";
import { assert } from "chai"
import { ValidationError } from "class-validator";
import { sessionsRoute } from "../routes/web-api/session-routes";

export const server = fastify({
    ajv : {
        customOptions: {
            removeAdditional: false
        }
    }
})
.setErrorHandler((error, request, reply) => {
    
    let statusCode = 500
    let errorMessage = 'Internal Server Error'

    if (request.method == 'POST') {
      if (!request.body || !request.params || !request.query) {
        statusCode = 400
        errorMessage = 'Validation schema is missing'
      }
    }

    if (error instanceof ValidationError) {
        statusCode = 400
        errorMessage = 'Bad request'
    }
    
    reply.status(statusCode).send({
      error: errorMessage,
      message: errorMessage
    })
})
.addHook('onRoute', assertsResponseSchemaPresenceHook)
.register(userRoutes, { prefix: "/web-api/users" })
.register(sessionsRoute, { prefix: "/web-api/sessions" })

export function assertsResponseSchemaPresenceHook (routeOptions: RouteOptions) {
    assert.isUndefined(routeOptions.onError)

    if (!routeOptions.schema) {
        routeOptions.handler = (request, reply) => {
          reply.status(400).send({
            error: 'Bad Request',
            message: 'Validation schema is missing'
          })
        }
      }
}
      