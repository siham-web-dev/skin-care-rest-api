import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from "typeorm"
import Order from "./OrderModel"
import Company from "./CompanyModel"
import Message from "./MessageModel"
import { Role } from "../../../entities/types/enum"
import * as dotenv from "dotenv"
dotenv.config()

const DEFAULT_USER_IMAGE_URL = `${process.env.STORAGE_DIR_PATH}/default.png`

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

    @OneToMany(() => Message, (message) => message.user)
    messages: Message[]

    @OneToOne(() => Company, (company) => company.user)
    company: Company
}

export default User