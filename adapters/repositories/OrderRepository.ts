import { EntityManager } from 'typeorm';
import { Repository } from './Repository';
import Order from '../../entities/Order';
import OrderModel from '../../frameworks/DBConfig/models/OrderModel';
import { Status } from '../../entities/types/enum';
import AppError from '../../frameworks/ServerConfig/utils/appError';

class OrderRepository extends Repository {
   
   constructor(db: EntityManager) {
          super(db);
    }

    async getOrderById(orderId: number) {
        const order = await this.db.findOne(OrderModel, { where: { id: orderId } , relations: ['product', 'user']});
        if (!order) {
            throw new AppError('Order not found', 404);
        }
        return order;
    }
    
    async createOrder(order: Order) {
        const new_order = await this.db.create(OrderModel, {
            status: Status.PENDING,
            product: {
                id: order.productId
            },
            user: {
                id: order.userId
            },
            address: order.address,
            quantity: order.quantity
        });

        await this.db.save(OrderModel, new_order);

    }

    async updateStatus(orderId: number, status: Status) {
        await this.db.update(OrderModel, { id: orderId }, { status });
    }

}

export default OrderRepository