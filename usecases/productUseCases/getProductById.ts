import ProductRepository from "../../adapters/repositories/ProductRepository";
import ProductModel from "../../frameworks/DBConfig/models/ProductModel";
import AppError from "../../frameworks/ServerConfig/utils/appError";

type GetProductByIdOutput = {
  product: ProductModel;
  recommendedProducts?: ProductModel[] | null;
};

class GetProductById {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(id: number, type: string): Promise<GetProductByIdOutput> {
    const product = await this.productRepository.findProductById(id);
    if (!product) {
      throw new AppError("product not found", 404);
    }
    if (type === "WITH_RECOMMENDATIONS") {
      const recommendedProducts =
        await this.productRepository.findProductsByCompanyID(
          product.company.id,3,0
        );

      return { product, recommendedProducts };
    }

    return { product };
  }
}

export default GetProductById;
