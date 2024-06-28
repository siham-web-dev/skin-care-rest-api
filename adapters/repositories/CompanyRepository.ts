// src/interface-adapters/repositories/productRepository.ts

import { EntityManager } from 'typeorm';
import { Repository } from './Repository';
import Company from '../../entities/Company';
import CompanyModel from '../../frameworks/DBConfig/models/CompanyModel';
import AppError from '../../frameworks/ServerConfig/utils/appError';

class CompanyRepository extends Repository {
    
    constructor(db: EntityManager) {
       super(db);
    }

    async addCompany(company: Company): Promise<CompanyModel> {
        const newCompany = await this.db.create(CompanyModel, {
            ...company,
            user: {
                id: company.userId
            }
        });

        return newCompany
    }
    
    async findCompanyById(id: number): Promise<CompanyModel | null> {
        const company = await this.db.findOne(CompanyModel, {
            where: [
                { id },
            ],
        });

        return company
    }

    async updateCompany(company: Company, id: number): Promise<CompanyModel> {
        const c = await this.findCompanyById(id);
        if (!c) {
            throw new AppError('Company not found', 404);
        }

        const updatedCompany = await this.db.save(CompanyModel, {
            ...company
        });

        return updatedCompany
    }


}

export default CompanyRepository
