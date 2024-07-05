import { Between, EntityManager, LessThanOrEqual, Like } from 'typeorm';
import { Repository } from './Repository';
import AppError from '../../frameworks/ServerConfig/utils/appError';
import ProductModel from '../../frameworks/DBConfig/models/ProductModel';
import Product from '../../entities/Product';
import { removeExistedImage } from '../../frameworks/ServerConfig/utils/files';


class ProductRepository extends Repository {
    
    constructor(db: EntityManager) {
       super(db);
    }
   
    async getTotalProductsForCompany(companyID: number): Promise<number> {
        const productsTotal = await this.db.count(ProductModel, {
            where: [
                { company: { id: companyID } },
            ]
        })

        return productsTotal
    }

    async findProductsByKeyword(keyword: string, limit: number, skip: number,
        price_lte?: number, price_gte?: number) {
        const query = price_lte && price_gte ? [
            { name: Like(`%${keyword}%`), price: Between(price_gte, price_lte) },
            { description:  Like(`%${keyword}%`), price: Between(price_gte, price_lte) },
        ] :
        [
            { name: Like(`%${keyword}%`) },
            { description:  Like(`%${keyword}%`) },
        ]
        
        const totalProducts = await this.db.count(ProductModel, {
            where: query,
        })

        const products = await this.db.find(ProductModel, {
            where: query,
            skip: skip,
            take: limit,
            order: {
                name: 'ASC'
            },
        });

        return {products, totalProducts}
    }
    async findProductsByCompanyID(companyID: number, limit: number, skip: number): Promise<ProductModel[] | null> {
        const products = await this.db.find(ProductModel, {
            where: [
                { company: { id: companyID } },
            ],
            skip: skip,
            take: limit,
            order: {
                name: 'ASC'
            },
        });
        return products
    }

    async addProduct(product: Omit<Product, 'id'>): Promise<ProductModel> {
        const newProduct = await this.db.create(ProductModel, {
            ...product,
            company: {
                id: product.companyID
            }
        })
        await this.db.save(ProductModel, newProduct)
        
        return newProduct
    }
    
    async findProductById(id: number): Promise<ProductModel | null> {
        const product = await this.db.findOne(ProductModel, {
            where: [
                { id },
            ],
            relations: ['company']
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
