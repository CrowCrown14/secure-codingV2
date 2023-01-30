import fastify, { RouteOptions } from "fastify";
import { userRoutes } from "../routes/web-api/users-routes";
import { assert } from "chai"

export const server = fastify({
    ajv : {
        customOptions: {
            removeAdditional: false
        }
    }
})
.addHook('onRoute', assertsResponseSchemaPresenceHook)
.register(userRoutes, { prefix: "/web-api/users" })

export function assertsResponseSchemaPresenceHook (routeOptions: RouteOptions) {
    assert.isUndefined(routeOptions.onError)

    if (!routeOptions.schema) {
        routeOptions.handler = (request, reply) => {
          reply.status(400).send({
            error: 'Bad Request',
            message: 'validation schema is missing'
          })
        }
      }
}
      