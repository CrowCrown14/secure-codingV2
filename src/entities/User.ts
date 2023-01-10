import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, Unique } from "typeorm"
import { Min, IsEmail, Validate } from "class-validator"
import { validate } from "class-validator"
import { UniqueInColumn } from "../validator/UniqueInColumn"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({nullable : false})
    firstName!: string

    @Column({nullable : false})
    lastName!: string

    @IsEmail()
    @UniqueInColumn({message :"Email can't be duplicate"})
    @Column({nullable : false, unique : true})
    email!: string

    @Column({nullable : false})
    @Min(0)
    age!: number

    @BeforeInsert()
    @BeforeUpdate()
    async emailEmpty() {
        const errors = await validate(this)
        if (errors.length > 0) {
            throw errors[0]
        }
    }
}
