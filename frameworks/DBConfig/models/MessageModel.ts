import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import User from "./UserModel"
import { SenderType } from "../../../entities/types/enum"

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