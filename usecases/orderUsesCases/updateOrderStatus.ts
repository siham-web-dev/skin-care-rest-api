import OrderRepository from "../../adapters/repositories/OrderRepository";
import ProductRepository from "../../adapters/repositories/ProductRepository";
import { Status } from "../../entities/types/enum";

type Card = {
    products: {
        id: number;
        quantity: number;
    }[]
    userId: number
    address: string
}

class UpdateOrderStatus {
    private orderRepository: OrderRepository;
    private productRepository: ProductRepository

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
    }
    
  async execute(id: number, status: Status) { 
    const order =  await this.orderRepository.getOrderById(id);
    await this.orderRepository.updateStatus(id, status);
    
     if (status === Status.ACCEPTED) {
        const product: any = await this.productRepository.findProductById(order.product.id);
        product.quantity = product.quantity - order.quantity;
        await this.productRepository.updateProduct(product);
    }
  }
}

export default UpdateOrderStatus;
