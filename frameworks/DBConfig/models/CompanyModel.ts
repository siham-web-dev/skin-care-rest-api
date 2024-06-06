import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from "typeorm"
import Product from "./ProductModel"
import User from "./UserModel"

@Entity()
class Company {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string
    
    @Column()
    address: string

    @Column()
    phone: string

    @Column()
    logo_url: string

    @OneToMany(() => Product, (product) => product.company)
    products: Product[]
    
    @OneToOne(() => User, (user) => user.company)
    @JoinColumn()
    user: User
}

export default Company