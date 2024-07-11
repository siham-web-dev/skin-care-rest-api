import { Between, EntityManager, LessThanOrEqual, Like } from "typeorm";
import { Repository } from "./Repository";
import AppError from "../../frameworks/ServerConfig/utils/appError";
import ProductModel from "../../frameworks/DBConfig/models/ProductModel";
import Product from "../../entities/Product";
import { removeExistedImage } from "../../frameworks/ServerConfig/utils/files";
import { Status } from "../../entities/types/enum";

class ProductRepository extends Repository {
  constructor(db: EntityManager) {
    super(db);
  }

  async getTotalProductsForCompany(companyID: number): Promise<number> {
    const productsTotal = await this.db.count(ProductModel, {
      where: [{ company: { id: companyID } }],
    });

    return productsTotal;
  }

  async findProductsByKeyword(
    keyword: string,
    limit: number,
    skip: number,
    price_lte?: number,
    price_gte?: number
  ) {
    const query =
      price_lte && price_gte
        ? [
            {
              name: Like(`%${keyword}%`),
              price: Between(price_gte, price_lte),
            },
            {
              description: Like(`%${keyword}%`),
              price: Between(price_gte, price_lte),
            },
          ]
        : [
            { name: Like(`%${keyword}%`) },
            { description: Like(`%${keyword}%`) },
          ];

    const totalProducts = await this.db.count(ProductModel, {
      where: query,
    });

    const products = await this.db.find(ProductModel, {
      where: query,
      skip: skip,
      take: limit,
      order: {
        name: "ASC",
      },
    });

    return { products, totalProducts };
  }

  async getAnalytics(companyId: number){
    // get total profit
    const products = await this.db.find(ProductModel, {
      where: [
        {
          company: { id: companyId },
          orders: { status: Status.PAID },
        },
        ],
     relations: ["orders"],
        select: {
        orders: {
          quantity: true,
        },
        price: true,
        quantity: true,
        name: true,
      },
    });
   
      let product_totalPrices: any[] = []
      products.forEach(product => {
        const totalQuantity = product.orders.reduce((acc, order) => acc + order.quantity, 0);
        product_totalPrices.push({price: product.price * totalQuantity, name: product.name})
      });

      const totalProfit = product_totalPrices.reduce((acc, p) => acc + p.price, 0);
      
      // get total paid orders
      const total_orders = products.reduce((acc, product) => acc + product.orders.length, 0);
      
      // get total quantity in stock
      const total_stock = await this.db.sum(ProductModel, "quantity" , {
          company: { id: companyId },
      })

      // get top 5 sold products
      product_totalPrices = product_totalPrices.sort((a, b) => b.price - a.price);
      
      const top5Products = product_totalPrices.slice(0, 5);
      
      return {totalProfit, total_orders, total_stock, top5Products};
  }

  async getOrdersOfProductOfCompany(id: number) {
    const products = await this.db.find(ProductModel, {
      where: [
        {
          company: { id },
        },
      ],
      relations: ["orders"],
    });
    const orders: any = [];
    products.forEach((product) => {
      if (product.orders.length > 0) {
        for (let i = 0; i < product.orders.length; i++) {
          const order = product.orders[i];
          const productName = product.name;
          const productId = product.id;
          orders.push({ ...order, productName, productId });
        }
      }
    });

    return { count: orders.length, orders };
  }
  async findProductsByCompanyID(
    companyID: number,
    limit: number,
    skip: number
  ): Promise<ProductModel[] | null> {
    const products = await this.db.find(ProductModel, {
      where: [{ company: { id: companyID } }],
      skip: skip,
      take: limit,
      order: {
        name: "ASC",
      },
    });
    return products;
  }

  async addProduct(product: Omit<Product, "id">): Promise<ProductModel> {
    const newProduct = await this.db.create(ProductModel, {
      ...product,
      company: {
        id: product.companyID,
      },
    });
    await this.db.save(ProductModel, newProduct);

    return newProduct;
  }

  async findProductById(id: number): Promise<ProductModel | null> {
    const product = await this.db.findOne(ProductModel, {
      where: [{ id }],
      relations: ["company"], 
    });

    if (!product) {
      throw new AppError("product not found", 404);
    }

    return product;
  }

  async updateProduct(product: Product): Promise<ProductModel> {
    const p = await this.findProductById(product.id as number);
    if (!p) {
      throw new AppError("product not found", 404);
    }

    if (product.image_url) {
      // remove previous image
      removeExistedImage(p.image_url);
    }
    else {
      product.image_url = p.image_url;
     }

    await this.db.update(ProductModel, p.id, {
      ...product,
    })

    return p;
  }

  async deleteProduct(id: number): Promise<void> {
    const product = await this.findProductById(id);
    if (!product) {
      throw new AppError("product not found", 404);
    }

    removeExistedImage(product.image_url);
    await this.db.delete(ProductModel, { id });
  }
}

export default ProductRepository;
