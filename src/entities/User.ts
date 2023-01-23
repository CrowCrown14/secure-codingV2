import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, Unique, ReturningStatementNotSupportedError } from "typeorm"
import { Min, IsEmail, Validate } from "class-validator"
import { validate } from "class-validator"
import { UniqueInColumn } from "../validator/UniqueInColumn"
import { SemanticError } from "../error/SemanticError"


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({nullable : false})
    firstName!: string

    @Column({nullable : false})
    lastName!: string

    @IsEmail()
    // @UniqueInColumn({message :"Email can't be duplicate"})
    @Column({nullable : false, unique : true})
    email!: string

    @Column({nullable : false})
    @Min(0)
    age!: number

    @Column({nullable : true})
    passwordHash!: string

    @BeforeInsert()
    @BeforeUpdate()
    async emailEmpty() {

        const errors = await validate(this)
        if (errors.length > 0) {
            throw errors[0]
        }
    }

    @BeforeInsert()
    async setPassword(password: string, passwordConfirmation: string) {
        const bcrypt = require('bcrypt')
        if (password === passwordConfirmation) {
            bcrypt.hash(password, 10, (err : Error,hash: string) => {
                if (err == undefined) {
                    this.passwordHash = hash
                }
            })
        }
        else {
            throw new SemanticError("",this,"passwordHash")
        }
        
    }
}
