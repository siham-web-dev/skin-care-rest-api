import { DataSource } from "typeorm"
import * as dotenv from "dotenv";
import Product from "./models/ProductModel";
import Message from "./models/MessageModel";
import Order from "./models/OrderModel";
import User from "./models/UserModel";
import Company from "./models/CompanyModel";
import Session from "./models/SessionModel";
dotenv.config();

 const dbConnect = new DataSource({
    type: "postgres",
    host: process.env.DB_SERVER_HOST,
    port: parseInt(<string>process.env.DB_SERVER_PORT),
    username: process.env.DB_SERVER_USERNAME,
    password: process.env.DB_SERVER_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [Product, Company, User, Order, Message, Session],
    subscribers: [],
    migrations: [],
 })

 export default dbConnect