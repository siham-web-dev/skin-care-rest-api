import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm"
import User from "./UserModel"

@Entity()
 class Session {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.sessions)
    user: User

    @Column({default: true})
    is_active: boolean 

}

export default Session