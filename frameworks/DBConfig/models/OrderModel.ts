import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import Product from "./ProductModel"
import User from "./UserModel"

enum Status {
    PENDING = "pending",
    ACCEPTED = "accepted",
    DELIVERED = "delivered",
    CANCELLED = "cancelled",
    PAID = "paid",
    UNPAID = "unpaid"
}

@Entity()
class Order {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    status: Status

    @Column()
    address: string
 
    @Column()
    quantity: number

    @Column()
    price: number

    @Column()
    image_url: string

    @ManyToOne(() => Product, (product) => product.orders)
    product: Product

    @ManyToOne(() => User, (user) => user.orders)
    user: User
}

export default Order