import express, { Express, Request, Response } from "express";
import router from "./routes";
import cors from "cors";
import "reflect-metadata";
import ErrorHandler from "./middlewares/error";
import bodyParser from "body-parser";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import options from "./utils/swagger";

function createServer(): Express {
  const app: Express = express();
  const swaggerSpec = swaggerJSDoc(options)

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/storage", express.static('storage'));
  
  app.use("/api/v1/", router);
  app.use("/api/v1/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec), (req:Request, res:Response) => {
    
  });
  app.use(ErrorHandler);

  return app;
}

export default createServer;
