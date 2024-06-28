import dbConnect from "../../frameworks/DBConfig";
import { NextFunction, Request, Response } from "express";
import CompanyRepository from "../repositories/CompanyRepository";
import UserRepository from "../repositories/UserRepository";
import CompanyAddOrUpdate from "../../usecases/companyUsesCases/companyAddOrUpdate";
import AppError from "../../frameworks/ServerConfig/utils/appError";
import { verifyImage } from "../../frameworks/ServerConfig/utils/files";

class CompanyController {
  private companyRepository: CompanyRepository;
  private userRepository: UserRepository;
 
  constructor() {
    const db = dbConnect.manager;
    this.companyRepository = new CompanyRepository(db);
    this.userRepository = new UserRepository(db);
  }

  async add(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { userId } = req.body;
    try {
      if (req.files?.length === 0) {
        throw new AppError("No file uploaded",400);
      }
      else verifyImage(req.files);
      await this.userRepository.findUserById(userId);
      const addCompanyUseCase = new CompanyAddOrUpdate(this.companyRepository);
      const company = await addCompanyUseCase.execute("ADD", req.body);
      
      res.status(200).send(company);
    } catch (error) {
      next(error);
    }
  }
  
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    try {
      await this.companyRepository.findCompanyById(+id);
      const updateCompanyUseCase = new CompanyAddOrUpdate(this.companyRepository);
      // upload logo 
      //const company = await updateCompanyUseCase.execute("UPDATE", { ...req.body, id: +id });
      
      res.status(200).send("company");
    } catch (error) {
      next(error);
    }
  }
}

export default CompanyController;
