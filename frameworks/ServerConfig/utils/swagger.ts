import swaggerJSDoc from "swagger-jsdoc";
import { version } from "../../../package.json";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Skinno rest api",
      description:
        "Skine care products multi-company store rest api with ai assistant powered by gemini",
      version,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
      },
    ],
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    "./frameworks/ServerConfig/routes/index.ts",
    "./frameworks/ServerConfig/routes/**/index.ts",
  ],
};

export default options;
