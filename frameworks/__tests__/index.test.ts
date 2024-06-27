import createServer from "../ServerConfig/server";
import dbConnect from "../DBConfig";
import authentication_system_test from "./auth/index.test";

const app = createServer();
let server: any, connection: any;

beforeAll(async () => {
  connection = await dbConnect.initialize();
  connection.synchronize();
  server = await app.listen(5000);
});

afterAll(async () => {
  server.close();
  connection.close();
});

authentication_system_test(app);
