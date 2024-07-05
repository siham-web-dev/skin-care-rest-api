import dbConnect from "../../frameworks/DBConfig";
import { NextFunction, Request, Response } from "express";
import AppError from "../../frameworks/ServerConfig/utils/appError";
import { verifyImage } from "../../frameworks/ServerConfig/utils/files";
import ProductRepository from "../repositories/ProductRepository";
import ProductAdd from "../../usecases/productUseCases/ProductAdd";
import Product from "../../entities/Product";
import ProductUpdate from "../../usecases/productUseCases/ProductUpdate";
import ProductDelete from "../../usecases/productUseCases/ProductDelete";
import GetProductsForAdmin from "../../usecases/productUseCases/getProductsForAdmin";
import GetProducts from "../../usecases/productUseCases/getProducts";

class CompanyController {
  private productRepository: ProductRepository;

  constructor() {
    const db = dbConnect.manager;
    this.productRepository = new ProductRepository(db);
  }

  async getProducts(req: Request, res: Response, next: NextFunction) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const keyword = req.query.keyword || "";
    const skip = (page - 1) * limit;
    const price_lte = parseFloat(req.query.price_lte as string) || 0;
    const price_gte = parseFloat(req.query.price_gte as string) || 0;

    try {
      const GetProductsUseCase = new GetProducts(
        this.productRepository
      );
      const {products, totalProducts} = await GetProductsUseCase.execute(
        keyword as string,
        limit,
        skip,
        price_lte,
        price_gte
      );

      const pages = Math.ceil(totalProducts / limit);
      const nextPage = page < pages ? page + 1 : null;
     
      res.status(200)
        .send({ products, nextPage, pages, totalProducts, current_page: page });
    }
    catch (error) {
      next(error);
    }
  }

  async getAllProductsOfCompany(req: any, res: Response, next: NextFunction) {
    const companyID = req.sessionInfo.company.id;
    const page  = parseInt(req.query.page) || 1;
    const  limit  = req.query.limit || 10;

    try {
      const GetProductsForAdminUseCase = new GetProductsForAdmin(
        this.productRepository
      );

      console.log(page, limit);
      

      const products = await GetProductsForAdminUseCase.execute(
        companyID,
        page,
        limit
      );
      const totalProducts =
        await this.productRepository.getTotalProductsForCompany(companyID);

      const pages = Math.ceil(totalProducts / limit);
      const nextPage = page < pages ? page + 1 : null;

      res
        .status(200)
        .send({ products, nextPage, pages, totalProducts, current_page: page });
    } catch (error) {
      next(error);
    }
  }

  async add(req: any, res: Response, next: NextFunction): Promise<void> {
    const companyID = req.sessionInfo.company.id;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    try {
      const hasImageProperty = "image" in files;
      if (!hasImageProperty) {
        throw new AppError(
          "you couldn't add product without image . you must provide us image",
          400
        );
      }

      const image = files["image"][0];
      const image_url = verifyImage(image);

      const addProductUseCase = new ProductAdd(this.productRepository);

      const product: Product = new Product(
        req.body.name,
        req.body.description,
        req.body.ingredients,
        req.body.how_to_use,
        req.body.quantity,
        req.body.price,
        image_url
      );
      product.companyID = companyID;
      const newProduct = await addProductUseCase.execute(product);

      res.status(200).send(newProduct);
    } catch (error) {
      next(error);
    }
  }

  async update(req: any, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    const { id: companyID } = req.sessionInfo.company;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    try {
      const usecaseParameter = {
        ...req.body,
        id: +id,
      };
      const hasImageProperty = "image" in files;
      if (hasImageProperty) {
        const image = files["image"][0];
        const image_url = verifyImage(image);

        usecaseParameter.image_url = image_url;
      }

      const product = await this.productRepository.findProductById(+id);

      if (product?.company.id !== companyID) {
        throw new AppError("You are not allowed to update this product", 403);
      }
      const updateProductUseCase = new ProductUpdate(this.productRepository);
      const company = await updateProductUseCase.execute(usecaseParameter);

      res.status(200).send(company);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: any, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    const { id: companyID } = req.sessionInfo.company;
    try {
      const product = await this.productRepository.findProductById(+id);
      if (product?.company.id !== companyID) {
        throw new AppError("You are not allowed to delete this product", 403);
      }
      const deleteProductUseCase = new ProductDelete(this.productRepository);
      await deleteProductUseCase.execute(+id);
      res
        .status(200)
        .send({ message: "The product has been deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export default CompanyController;
