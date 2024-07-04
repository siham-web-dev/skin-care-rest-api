import ProductRepository from "../../adapters/repositories/ProductRepository";
import ProductModel from "../../frameworks/DBConfig/models/ProductModel";

class GetProductsForAdmin {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(
    companyID: number,
    page: number,
    limit: number
  ): Promise<ProductModel[] | null> {
      console.log(companyID, page, limit);
      
    const skip = (page - 1) * limit;
    const products = await this.productRepository.findProductsByCompanyID(
      companyID, limit, skip
    );

    return products;
  }
}

export default GetProductsForAdmin;
