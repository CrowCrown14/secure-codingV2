import fastify, { FastifyInstance } from "fastify"
import { User } from "../../entities/User"
import { AppDataSource } from "../../lib/typeorm"
import { userCreateSessionRequestBody, UserCreateSessionRequestBody } from '../../schema/userCreateSessionRequestBody'

export async function sessionsRoute (fastify : FastifyInstance) {
    fastify.post<{ Body : UserCreateSessionRequestBody }>('/', {
        schema: {
            body : userCreateSessionRequestBody,
        }
    }, 
    async (request, reply) => {

        const {email, password} = request.body
            
        if (!email) {
            reply.status(400).send({ error : "missing email"})
        }
        else if (!password) {
            reply.status(400).send({ error : "missing password"})
        }
        else {
            const userInDatabase = await AppDataSource
                .getRepository(User)
                .createQueryBuilder()
                .select("user.id")
                .addSelect("user.lastName")
                .addSelect("user.firstName")
                .addSelect("user.email")
                .from(User, "user")
                .where("user.email = :email and user.hashPassword = :hashPassword", {'email' : email, 'hashPassword' : password})
                .getOne()
    
            if (!userInDatabase) {
                reply.status(400).send({ error : 'Invalid email or password' });
            }
            else {
                reply.status(400).send({"test": "here"})
            }
            
        }

        
    })
}