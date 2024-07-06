import { SenderType } from "./types/enum"

class Message {
    id?: number
    content: string
    sentAt: number
    senderType: SenderType
    roomId: number

    constructor(content: string, sentAt: number, senderType: SenderType, roomId: number) {
        this.content = content
        this.sentAt = sentAt
        this.senderType = senderType
        this.roomId = roomId
    }
}

export default Message