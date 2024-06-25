import express, { Express } from "express";
import router from "./routes";
import cors from "cors";
import "reflect-metadata";
import ErrorHandler from "./middlewares/error";

function createServer(): Express {
  const app: Express = express();

  app.use(express.json());
  app.use(cors());
  
  app.use("/api/v1/", router);
  app.use(ErrorHandler);
  
  return app;
}

export default createServer;
