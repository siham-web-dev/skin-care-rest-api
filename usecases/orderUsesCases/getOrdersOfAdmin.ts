import ProductRepository from "../../adapters/repositories/ProductRepository";

class getOrdersOfAdmin {
    private productRepository: ProductRepository

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
    }
    
  async execute(companyID: number, limit: number, skip: number) {
      const {count: totalOrders, orders} = await this.productRepository.getOrdersOfProductOfCompany(companyID);
      
      const ordersOfPage = orders.slice(skip, skip + limit);
      return {ordersOfPage, totalOrders};
  } 
     
}

export default getOrdersOfAdmin;