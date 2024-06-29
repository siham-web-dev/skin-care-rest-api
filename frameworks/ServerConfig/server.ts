import express, { Express } from "express";
import router from "./routes";
import cors from "cors";
import "reflect-metadata";
import ErrorHandler from "./middlewares/error";
import bodyParser from "body-parser";
import path from "path";

function createServer(): Express {
  const app: Express = express();
  
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/storage", express.static('storage'));
  
  app.use("/api/v1/", router);
  app.use(ErrorHandler);

  return app;
}

export default createServer;
