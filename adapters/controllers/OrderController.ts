import { NextFunction, Response } from "express";
import dbConnect from "../../frameworks/DBConfig";
import OrderRepository from "../repositories/OrderRepository";
import CreateOrder from "../../usecases/orderUsesCases/createOrder";
import UpdateOrderStatus from "../../usecases/orderUsesCases/updateOrderStatus";
import ProductRepository from "../repositories/ProductRepository";
import UserRepository from "../repositories/UserRepository";
import getOrdersOfAdmin from "../../usecases/orderUsesCases/getOrdersOfAdmin";

class OrderController {
  private orderRepository: OrderRepository;
  private productRepository: ProductRepository
  private userRepository: UserRepository
   constructor() {
        const db = dbConnect.manager;
        this.orderRepository = new OrderRepository(db);
        this.productRepository = new ProductRepository(db);
        this.userRepository = new UserRepository(db);
    }
    
  async getOrdersforAdmins(req: any, res: Response, next: NextFunction) {
    const { userId } = req.sessionInfo
    const page = req.query.page || 1
    const limit = req.query.limit || 10
    const skip = (page - 1) * limit
    try {

      const user: any = await this.userRepository.findUserById(userId)
      const getOrdersOfAdminsUseCase = new getOrdersOfAdmin(this.productRepository)
      const orders = await getOrdersOfAdminsUseCase.execute(user.company.id, limit, skip)
      const pages = Math.ceil(orders.totalOrders / limit)
      const nextPage = page < pages ? page + 1 : null

      res.status(200).send({...orders, current_page: page, nextPage, pages}) 
    } catch (error) {
      next(error)
    }
  }
    async createOrder(req: any, res: Response, next: NextFunction): Promise<any> {
      const { userId } = req.sessionInfo 
      try {
          const createOrderUseCase = new CreateOrder(this.orderRepository)
          await createOrderUseCase.execute({ ...req.body, userId })
        
          res.status(200).send({ message: "Order created successfully" })
      } catch (error) {
        next(error)
      }
    }

    async updateStatus(req: any, res: Response, next: NextFunction): Promise<any> {
        const { id } = req.params
        const { status } = req.body
      try {
          const updateStatusUseCase = new UpdateOrderStatus(this.orderRepository, this.productRepository)
          await updateStatusUseCase.execute(id, status)
        
          res.status(200).send({ message: "Order status updated successfully" })
      } catch (error) {
        next(error)
      }
  }

   async getAnalytics(req: any, res: Response, next: NextFunction) {
    const { userId } = req.sessionInfo
    try {
      const user: any = await this.userRepository.findUserById(userId)
      if (!user.company) {
       res.status(200).send({ analytics: null })

      }
      const analytics = await this.productRepository.getAnalytics(user.company.id)
      res.status(200).send({ analytics })
    } catch (error) {
      next(error)
     }
  }
  
}


export default OrderController