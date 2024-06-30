import { EntityManager } from 'typeorm';
import { Repository } from './Repository';
import AppError from '../../frameworks/ServerConfig/utils/appError';
import ProductModel from '../../frameworks/DBConfig/models/ProductModel';
import Product from '../../entities/Product';
import { removeExistedImage } from '../../frameworks/ServerConfig/utils/files';


class ProductRepository extends Repository {
    
    constructor(db: EntityManager) {
       super(db);
    }

    async addProduct(product: Omit<Product, 'id'>): Promise<ProductModel> {
        const newProduct = await this.db.create(ProductModel, {
           ...product
        })
        await this.db.save(ProductModel, newProduct)
        
        return newProduct
    }
    
    async findProductById(id: number): Promise<ProductModel | null> {
        const product = await this.db.findOne(ProductModel, {
            where: [
                { id },
            ],
        });

        if (!product) {
            throw new AppError('product not found', 404);
        }

        return product
    }

    async updateProduct(product: Product): Promise<ProductModel> {
        const p = await this.findProductById(product.id as number);
        if (!p) {
            throw new AppError('product not found', 404);
        }
       
        if (product.image_url) {
            // remove previous image
            removeExistedImage(p.image_url);
        }

        const updatedProduct = await this.db.save(ProductModel, {
            ...product
        });

        return updatedProduct
    }

    async deleteProduct(id: number): Promise<void> {
        const product = await this.findProductById(id);
        if (!product) {
            throw new AppError('product not found', 404);
        }

        removeExistedImage(product.image_url);
        await this.db.delete(ProductModel, { id })
    }

}

export default ProductRepository
