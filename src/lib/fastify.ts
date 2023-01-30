import fastify, { RouteOptions } from "fastify";
import { userRoutes } from "../routes/web-api/users-routes";


export const server = fastify()
    .addHook('onRoute', assertsResponseSchemaPresenceHook)
    .register(userRoutes, { prefix: "/web-api/users" })

export function assertsResponseSchemaPresenceHook (routeOptions: RouteOptions) {
    routeOptions.method
    routeOptions.schema
    routeOptions.url
}
      