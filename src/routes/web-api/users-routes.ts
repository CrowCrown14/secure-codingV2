
import { validate } from "class-validator";
import { FastifyInstance } from "fastify";
import { User } from "../../entities/User";
import { AppDataSource } from "../../lib/typeorm";
import { UserCreateRequestBody, userCreateRequestBody } from "../../schema/userCreateRequestBody";
import { userCreateResponseBody } from "../../schema/userCreateResponseBody";

export async function userRoutes(fastify: FastifyInstance) {
    fastify.post<{ Body: UserCreateRequestBody }>('/', 
    {
        schema: {
            body: userCreateRequestBody
        }
    },
    async (request, reply) => {
        
        if (request.body.password != request.body.passwordConfirmation)
            reply.status(500).send("Password and confirmation password are not the same")
        

        const user = new User()
        user.firstName = request.body.firstName!
        user.lastName = request.body.lastName!
        user.email = request.body.email
        user.passwordHash = request.body.password
        user.age = 0

        await AppDataSource.manager.save(user)
        
        reply.status(200).send({ response : "user created" });
    }
    )
}