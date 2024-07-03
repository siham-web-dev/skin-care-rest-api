import dbConnect from "../../frameworks/DBConfig";
import { NextFunction, Request, Response } from "express";
import AppError from "../../frameworks/ServerConfig/utils/appError";
import { verifyImage } from "../../frameworks/ServerConfig/utils/files";
import ProductRepository from "../repositories/ProductRepository";
import ProductAdd from "../../usecases/productUseCases/ProductAdd";
import Product from "../../entities/Product";
import ProductUpdate from "../../usecases/productUseCases/ProductUpdate";
import ProductDelete from "../../usecases/productUseCases/ProductDelete";

class CompanyController {
  private productRepository: ProductRepository;

  constructor() {
    const db = dbConnect.manager;
    this.productRepository = new ProductRepository(db);
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
        
      const product: Product = new Product(req.body.name, req.body.description, req.body.ingredients,
        req.body.how_to_use, req.body.quantity, req.body.price, image_url);
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
        throw new AppError('You are not allowed to update this product', 403);
      }
      const updateProductUseCase = new ProductUpdate(
        this.productRepository
      );
      const company = await updateProductUseCase.execute(
        usecaseParameter
      );

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
        throw new AppError('You are not allowed to delete this product', 403);
      }
      const deleteProductUseCase = new ProductDelete(
        this.productRepository
      );
      await deleteProductUseCase.execute(+id);
      res.status(200).send({ message: "The product has been deleted successfully" });

    }
    catch (error) {
      next(error);
    }
  }
} 

export default CompanyController;
