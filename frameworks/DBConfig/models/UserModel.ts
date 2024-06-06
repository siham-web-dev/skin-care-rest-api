import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from "typeorm"
import Order from "./OrderModel"
import Company from "./CompanyModel"
import Message from "./MessageModel"

enum Role {
    ADMIN = "admin",
    CUSTOMER = "customer"
}

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
    role: Role

    @Column()
    email: string
    
    @Column()
    phone: string

    @Column()
    image_url: string

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[]

    @OneToMany(() => Message, (message) => message.user)
    messages: Message[]

    @OneToOne(() => Company, (company) => company.user)
    company: Company
}

export default User