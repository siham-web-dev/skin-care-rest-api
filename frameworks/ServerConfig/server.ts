import express, { Express } from "express";
import router from "./routes";
import cors from "cors";
import "reflect-metadata";
import session from "express-session";
import genFunc from "connect-pg-simple";
import { authPassportLocalStrategy } from "./middlewares/authPassportLocalStrategy";

function createServer(): Express {
  const DATABASE_URL = `pg://${process.env.DB_SERVER_USERNAME}:${process.env.DB_SERVER_PASSWORD}@
   ${process.env.DB_SERVER_HOST}:${process.env.DB_SERVER_PORT}/${process.env.DB_NAME}`;
  
  const app: Express = express();
  const PostgresqlStore = genFunc(session);
  const sessionStore = new PostgresqlStore({
    conString: DATABASE_URL,
  });
  const sessionOptions = {
    secret: <string>process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    store: sessionStore,
  };

  app.use(express.json());
  app.use(cors());
  app.use(session(sessionOptions));
  authPassportLocalStrategy();
    
  app.use("/api/v1/", router);

  return app;
}

export default createServer;
