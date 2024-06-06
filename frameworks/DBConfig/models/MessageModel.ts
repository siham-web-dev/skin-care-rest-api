import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import User from "./UserModel"

enum SenderType {
    USER = "user",
    BOT = "bot"
}

@Entity()
class Message {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @Column()
    sentAt: number
    
    @Column()
    senderType: SenderType

    @ManyToOne(() => User, (user) => user.messages)
    user: User
 
}

export default Message