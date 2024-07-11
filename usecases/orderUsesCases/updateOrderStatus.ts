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

  constructor(orderRepository: OrderRepository, productRepository: ProductRepository) {
    this.orderRepository = orderRepository;
    this.productRepository = productRepository
  }
    
  async execute(id: number, status: Status) { 
    const order =  await this.orderRepository.getOrderById(id);
    await this.orderRepository.updateStatus(id, status);
    
     if (status === Status.ACCEPTED) {
       const product: any = await this.productRepository.findProductById(order.product.id);
       const newQuantity = product.quantity - order.quantity;
       
       const p = {
         id: product.id,
         name: product.name,
         quantity: newQuantity,
         price: product.price,
         description: product.description,
         ingredients: product.ingredients,
         how_to_use: product.how_to_use,
        } 
        await this.productRepository.updateProduct(p);
    }
  }
}

export default UpdateOrderStatus;
