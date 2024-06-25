// src/interface-adapters/repositories/productRepository.ts

import { EntityManager } from 'typeorm';
import UserModel from '../../frameworks/DBConfig/models/UserModel';
import UserEntity from '../../entities/User';
import AppError from '../../frameworks/ServerConfig/utils/appError';
import { Repository } from './Repository';

export class UserRepository extends Repository {
    
    constructor(db: EntityManager) {
       super(db);
    }

    async findUserByUsernameOrEmailOrPhone(field: string): Promise<UserModel | null> {
        const user = await this.db.findOne(UserModel, {
            where: [
                { username: field },
                { email: field },
                { phone: field },
            ],
        });

        if (!user) {
            throw new AppError('User not found', 401);
        }

        return user;
    }

    async register(user: UserEntity): Promise<UserModel> {
        const userEntity = new UserModel();
        
        userEntity.firstName = user.firstName;
        userEntity.lastName = user.lastName;
        userEntity.username = user.username;
        userEntity.password = user.password;
        userEntity.role = user.role;
        userEntity.email = user.email;
        userEntity.phone = user.phone;

        await this.db.save(userEntity);
        
        return userEntity;
    }

}

export default UserRepository
