import { Entity, PrimaryGeneratedColumn, Column, BeforeUpdate, BeforeInsert } from "typeorm"
import { ValidationError } from "../error/ValidationError"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({nullable : false})
    firstName!: string

    @Column({nullable : false})
    lastName!: string

    @Column({nullable : false})
    email!: string

    @Column({nullable : false})
    age!: number

    @BeforeInsert()
    @BeforeUpdate()
    emailEmpty() {
        if (this.email == null || this.email == "") {
            throw new ValidationError("The email is required",this,"email");
        }
    }
}
