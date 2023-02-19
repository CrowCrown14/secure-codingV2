import { Entity, Column, CreateDateColumn, BeforeInsert, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { User } from './User'
import * as crypto from 'crypto'

@Entity()
export class Session {

    @Column({ primary: true ,length: 256 })
    token!: string

    @CreateDateColumn()
    createdAt!: Date

    @Column()
    expiresAt!: Date

    @Column({ nullable: true })
    revokedAt!: Date

    @ManyToOne(type => User, user => user.id)
    userId!: User

    @BeforeInsert()
    generateToken (userId : User) {
        const session = new Session()
        session.userId = userId
        this.token = crypto.randomBytes(48).toString('base64')
        this.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) //24h
        return session
    }
}