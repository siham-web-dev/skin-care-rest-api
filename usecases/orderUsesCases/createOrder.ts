import OrderRepository from "../../adapters/repositories/OrderRepository";

type Card = {
    products: {
        id: number;
        quantity: number;
    }[]
    userId: number
    address: string
}

class CreateOrder {
  private orderRepository : OrderRepository;

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
    }
    
  async execute(card: Card) { 
    for (let i = 0; i < card.products.length; i++) {
        const product = card.products[i];
        const order = {
            productId: product.id,
            quantity: product.quantity,
            userId: card.userId,
            address: card.address
        }
       await this.orderRepository.createOrder(order);
    }

  }
}

export default CreateOrder;
