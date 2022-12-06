import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../entities/User"

require('dotenv').config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: "tutorial",
    password: "privatepassword",
    database: "iam",
    synchronize: true,
    logging: true,
    entities: [User],
    migrations: [],
    subscribers: [],
})
