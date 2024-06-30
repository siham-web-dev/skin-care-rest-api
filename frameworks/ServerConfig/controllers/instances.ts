import CompanyController from "../../../adapters/controllers/CompanyController";
import UserController from "../../../adapters/controllers/UserContoller";
import ProductController from "../../../adapters/controllers/ProductController";

export const InUserContoller = new UserController();
export const InCompanyController = new CompanyController();
export const InProductController = new ProductController()