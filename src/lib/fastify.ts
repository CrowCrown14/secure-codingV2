import fastify from "fastify";
import { userRoutes } from "../routes/web-api/users-routes";


export const server = fastify()
    .register(userRoutes, { prefix: "/web-api/users" })
