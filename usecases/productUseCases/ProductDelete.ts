import ProductRepository from "../../adapters/repositories/ProductRepository";
import Product from "../../entities/Product";

class ProductDelete {
  private productRepository : ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
    }
    
  async execute(id: number): Promise<void> { 
    await this.productRepository.deleteProduct(id);
  }
}

export default ProductDelete;
