import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import Product from "./ProductModel"
import User from "./UserModel"
import { Status } from "../../../entities/types/enum"

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

    @ManyToOne(() => Product, (product) => product.orders)
    product: Product

    @ManyToOne(() => User, (user) => user.orders)
    user: User
}

export default Order