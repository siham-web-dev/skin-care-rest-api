import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { SenderType } from "../../../entities/types/enum"
import Room from "./RoomModel"

@Entity()
class Message {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @Column({ type: "bigint" })
    sentAt: number
    
    @Column()
    senderType: SenderType

    @ManyToOne(() => Room, (room) => room.messages)
    room: Room
 
}

export default Message