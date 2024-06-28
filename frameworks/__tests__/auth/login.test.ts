import supertest from "supertest";
import { Express } from 'express';

function login_unit_test(app: Express) {
    describe("Endpoint: /api/v1/auth/login \n", () => {
        describe("should login user with right credentials and return http status code 201 + token \n", () => {
          it("should login user with valid password", async () => {
            const userCredentials = {
              usernameOrEmailOrPhoneNumber: "islam24",
              password: "f12345!q",
            };
            const {
              status,
              body: { token, message },
            } = await supertest(app)
              .post("/api/v1/auth/login")
              .send(userCredentials);
    
            expect(status).toBe(201);
            expect(token).toBeDefined();
            expect(message).toBe("login success");
          });
    
          it("should login user with valid username", async () => {
            const userCredentials = {
              usernameOrEmailOrPhoneNumber: "siham24",
              password: "f12345!q",
            };
            const {
              status,
              body: { token, message },
            } = await supertest(app)
              .post("/api/v1/auth/login")
              .send(userCredentials);
    
            expect(status).toBe(201);
            expect(token).toBeDefined();
            expect(message).toBe("login success");
          });
    
          it("should login user with valid email", async () => {
            const userCredentials = {
              usernameOrEmailOrPhoneNumber: "siham@gmail.com",
              password: "f12345!q",
            };
            const {
              status,
              body: { token, message },
            } = await supertest(app)
              .post("/api/v1/auth/login")
              .send(userCredentials);
    
            expect(status).toBe(201);
            expect(token).toBeDefined();
            expect(message).toBe("login success");
          });
    
          it("should login user with valid phone", async () => {
            const userCredentials = {
              usernameOrEmailOrPhoneNumber: "+21312342454",
              password: "f12345!q",
            };
            const {
              status,
              body: { token, message },
            } = await supertest(app)
              .post("/api/v1/auth/login")
              .send(userCredentials);
    
            expect(status).toBe(201);
            expect(token).toBeDefined();
            expect(message).toBe("login success");
          });
        });
    
        describe("should not login user with wrong credentials and return http status code 401", () => {
          it("should not login user with wrong password", async () => {
            const userCredentials = {
              usernameOrEmailOrPhoneNumber: "islam24",
              password: "f1",
            };
            const { status } = await supertest(app)
              .post("/api/v1/auth/login")
              .send(userCredentials);
    
            expect(status).toBe(401);
          });
    
          it("should not login user with wrong username", async () => {
            const userCredentials = {
              usernameOrEmailOrPhoneNumber: "islam54",
              password: "f12345!q",
            };
            const { status } = await supertest(app)
              .post("/api/v1/auth/login")
              .send(userCredentials);
    
            expect(status).toBe(401);
          });
    
          it("should not login user with wrong email", async () => {
            const userCredentials = {
              usernameOrEmailOrPhoneNumber: "islam11@gmailcom",
              password: "f12345!q",
            };
            const { status } = await supertest(app)
              .post("/api/v1/auth/login")
              .send(userCredentials);
    
            expect(status).toBe(401);
          });
    
          it("should not login user with wrong phone", async () => {
            const userCredentials = {
              usernameOrEmailOrPhoneNumber: "+213222222",
              password: "f12345!q",
            };
            const { status } = await supertest(app)
              .post("/api/v1/auth/login")
              .send(userCredentials);
    
            expect(status).toBe(401);
          });
    
          it("user does not exist", async () => {
            const userCredentials = {
              usernameOrEmailOrPhoneNumber: "sirine24",
              password: "f12345!q",
            };
            const { status } = await supertest(app)
              .post("/api/v1/auth/login")
              .send(userCredentials);
    
            expect(status).toBe(401);
          });
        });
      });
}

export default login_unit_test