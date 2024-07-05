import ProductRepository from "../../adapters/repositories/ProductRepository";
import ProductModel from "../../frameworks/DBConfig/models/ProductModel";

type GetProductsOutput = {
    products: ProductModel[];
    totalProducts: number;
};

class GetProducts {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(
    keyword: string,
    limit: number,
    skip: number,
    price_lte?: number,
    price_gte?: number
  ): Promise<GetProductsOutput> {
    const {products, totalProducts} = await this.productRepository.findProductsByKeyword(
      keyword,
      limit,
      skip,
      price_lte,
      price_gte
    )
    return { products, totalProducts };
  }
}

export default GetProducts;
