import ProductRepository from "../../adapters/repositories/ProductRepository";
import Product from "../../entities/Product";

class ProductAdd {
  private productRepository : ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
    }
    
  async execute(productDto: Product) { 
    const product = await this.productRepository.addProduct(productDto);
    return product
  }
}

export default ProductAdd;
