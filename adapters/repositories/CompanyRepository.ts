import { EntityManager } from 'typeorm';
import { Repository } from './Repository';
import Company from '../../entities/Company';
import CompanyModel from '../../frameworks/DBConfig/models/CompanyModel';
import AppError from '../../frameworks/ServerConfig/utils/appError';
import fs from 'fs';
import dotenv from 'dotenv';

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

    async updateCompany(company: Company, id: number): Promise<CompanyModel> {
        const c = await this.findCompanyById(id);
        if (!c) {
            throw new AppError('Company not found', 404);
        }

        if (company.logo_url) {
            // remove previous image
            const previous_filename = c.logo_url.replace(process.env.WEB_SERVER_HOST + ':' + process.env.WEB_SERVER_PORT, '.');
            if (fs.existsSync(previous_filename)) {
                fs.unlinkSync(previous_filename);
            }
        }

        const updatedCompany = await this.db.save(CompanyModel, {
            ...company
        });

        return updatedCompany
    }

}

export default CompanyRepository
