import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm"
import Company from "./CompanyModel"
import Order from "./OrderModel"

@Entity()
 class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string
    
    @Column()
    ingredients: string

    @Column()
    how_to_use: string

    @Column()
    quantity: number

    @Column()
    price: number

    @Column()
    image_url: string

    @ManyToOne(() => Company, (company) => company.products)
    company: Company

    @OneToMany(() => Order, (order: any) => order.product)
    orders: Order[]
}

export default Product