import { EntityManager } from 'typeorm';
import { Repository } from './Repository';
import Company from '../../entities/Company';
import CompanyModel from '../../frameworks/DBConfig/models/CompanyModel';
import AppError from '../../frameworks/ServerConfig/utils/appError';
import fs from 'fs';
import dotenv from 'dotenv';
import { removeExistedImage } from '../../frameworks/ServerConfig/utils/files';

dotenv.config();

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
        })
        await this.db.save(CompanyModel, newCompany)
        
        return newCompany
    }
    
    async findCompanyById(id: number): Promise<CompanyModel | null> {
        const company = await this.db.findOne(CompanyModel, {
            where: [
                { id },
            ],

            relations: ['user']
        });

        if (!company) {
            throw new AppError('Company not found', 404);
        }

        return company
    }

    async updateCompany(company: Company, id: number) {
        let c = await this.findCompanyById(id);
        if (!c) {
            throw new AppError('Company not found', 404);
        }

        if (company.logo_url) {
           removeExistedImage(c.logo_url);
        }

        c.email = company.email;
        c.address = company.address;
        c.phone = company.phone;
        c.name = company.name;

        if (company.logo_url) {
            c.logo_url = company.logo_url ;
        }

        await this.db.save(CompanyModel, c);
        const updatedCompany = {
            id: c.id,
            name: c.name,
            email: c.email,
            address: c.address,
            phone: c.phone,
            logo_url: c.logo_url
        }
        return updatedCompany
    }

}

export default CompanyRepository
