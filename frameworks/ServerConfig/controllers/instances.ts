import CompanyController from "../../../adapters/controllers/CompanyController";
import UserController from "../../../adapters/controllers/UserContoller";
import ProductController from "../../../adapters/controllers/ProductController";
import RoomController from "../../../adapters/controllers/RoomController";
import OrderController from "../../../adapters/controllers/OrderController";

export const InUserContoller = new UserController();
export const InCompanyController = new CompanyController();
export const InProductController = new ProductController();
export const InRoomController = new RoomController();
export const InOrderController = new OrderController();
