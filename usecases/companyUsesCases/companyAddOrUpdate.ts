import CompanyRepository from "../../adapters/repositories/CompanyRepository";
import Company from "../../entities/Company";

class CompanyAddOrUpdate {
  private companyRepository : CompanyRepository;

  constructor(companyRepository: CompanyRepository) {
    this.companyRepository = companyRepository;
    }
    
  async execute(type: "ADD" | "UPDATE", companyDto: Company) { 
      if (type === "ADD") {
      return await this.companyRepository.addCompany(companyDto);
    } else if (type === "UPDATE") {
      return await this.companyRepository.updateCompany(companyDto, companyDto.id as number);
    }

  }
}

export default CompanyAddOrUpdate;
