import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from "typeorm"
import Order from "./OrderModel"
import Company from "./CompanyModel"
import Message from "./MessageModel"
import { Role } from "../../../entities/types/enum"
import * as dotenv from "dotenv"
import UserSession from "./SessionModel"
import Room from "./RoomModel"
dotenv.config()

const DEFAULT_USER_IMAGE_URL = `${process.env.STORAGE_DIR_PATH}/users/default.png`

@Entity()
class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    role: Role

    @Column()
    email: string
    
    @Column()
    phone: string

    @Column({
        nullable: true,
        default: DEFAULT_USER_IMAGE_URL
    })
    image_url: string

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[]

    @OneToOne(() => Company, (company) => company.user)
    company: Company

    @OneToMany(() => UserSession, (session) => session.user)
    sessions: UserSession[]

    @OneToMany(() => Room, (room) => room.user)
    rooms: Room[]
}

export default User