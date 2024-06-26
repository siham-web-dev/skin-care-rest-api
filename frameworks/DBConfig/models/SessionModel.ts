import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm"
import User from "./UserModel"

@Entity()
 class UserSession {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.sessions, {onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: false})
    user: User

    @Column({default: true})
    is_active: boolean 

}

export default UserSession