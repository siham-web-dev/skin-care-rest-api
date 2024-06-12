// src/interface-adapters/repositories/productRepository.ts

import { EntityManager, EntityRepository, Repository } from 'typeorm';
import UserModel from '../../frameworks/DBConfig/models/UserModel';
import UserEntity from '../../entities/User';

export class UserRepository {
    private db: EntityManager;
    
    constructor(db: EntityManager) {
        this.db = db;
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
