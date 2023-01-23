import { registerDecorator ,ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, ValidationOptions } from 'class-validator'
import { User } from '../entities/User'
import { DataSource } from "typeorm"

require('dotenv').config()

@ValidatorConstraint({ async: true })
export class UniqueInColumnConstraint implements ValidatorConstraintInterface {
    
    private repo: DataSource
    private mail: string

    constructor(mail: string) {
        this.mail = mail
        this.repo = new DataSource({
            type: "postgres",
            host: testUndefined("DB_HOST"),
            port: 5432,
            username: testUndefined("DB_USERNAME"),
            password: testUndefined("DB_PASSWORD"),
            database: testUndefined("DB_DATABASE"),
            synchronize: true,
            logging: true,
            entities: [User],
            migrations: [],
            subscribers: [],
            
        })
    }

    async validate(mail: string, args: ValidationArguments) {

        

        this.repo.initialize()

        const result = await this.repo
            .getRepository(User)
            .createQueryBuilder()
            .select("*")
            .from(User, "user")
            .where("user.email = :email", {email: mail})
            .getCount()

        const number = result
        if (number > 0) {
            return true
        }
        else
            return false
    
    }
}

export function UniqueInColumn(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: UniqueInColumnConstraint,
        })
    }
}

function testUndefined(value:string) {
    const val = process.env[value]
    
    if (val === 'undefined') {
        throw new SyntaxError("Undefined value");
    }
    return process.env[value]
}