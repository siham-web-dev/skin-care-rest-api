import { NextFunction, Response } from "express";
import dbConnect from "../../frameworks/DBConfig";
import OrderRepository from "../repositories/OrderRepository";
import CreateOrder from "../../usecases/orderUsesCases/createOrder";
import UpdateOrderStatus from "../../usecases/orderUsesCases/updateOrderStatus";

class OrderController {
    private orderRepository: OrderRepository;
   constructor() {
        const db = dbConnect.manager;
        this.orderRepository = new OrderRepository(db);
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
          const updateStatusUseCase = new UpdateOrderStatus(this.orderRepository)
          await updateStatusUseCase.execute(id, status)
          res.status(200).send({ message: "Order status updated successfully" })
      } catch (error) {
        next(error)
      }
    }

}


export default OrderController