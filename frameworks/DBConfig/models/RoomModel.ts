import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm"
import User from "./UserModel"
import Message from "./MessageModel"

@Entity()
class Room {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({ unique: true, nullable: true })
    slug: string

    @ManyToOne(() => User, (user) => user.rooms)
    user: User

    @OneToMany(() => Message, (message) => message.room)
    messages: Message[]
 
}

export default Room