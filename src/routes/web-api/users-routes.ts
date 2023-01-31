
import { validate } from "class-validator";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { User } from "../../entities/User";
import { AppDataSource } from "../../lib/typeorm";
import { UserCreateRequestBody, userCreateRequestBody } from "../../schema/userCreateRequestBody";
import { UserCreateResponseBody, userCreateResponseBody } from "../../schema/userCreateResponseBody";

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
    ),
    fastify.get<{ Params : String }>('/:id',
    {
        schema: {
            params: userCreateResponseBody
        }
    },
    async (request : FastifyRequest, reply : FastifyReply) => {
        const params = request.params

        if (params != undefined) {
            const userInDatabase = await AppDataSource
            .getRepository(User)
            .createQueryBuilder()
            .select("user.id")
            .addSelect("user.lastName")
            .addSelect("user.firstName")
            .addSelect("user.email")
            .from(User, "user")
            .where("user.id = :id", params)
            .getOne()
            
            
            const response = {
                id : userInDatabase?.id,
                firstName : userInDatabase?.firstName,
                lastName : userInDatabase?.lastName,
                email : userInDatabase?.email
            }

            if (userInDatabase != null) {
                reply.status(200).send(response)
            }
            else {
                reply.status(500).send("User doesn't exist")
            }
        }
        
    }
    )
}