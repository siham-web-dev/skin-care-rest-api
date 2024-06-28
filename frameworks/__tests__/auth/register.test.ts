import supertest from "supertest";
import { Express } from "express";

function register_unit_test(app: Express) {
  describe("Endpoint: /api/v1/auth/register \n", () => {
    describe("should user register with right credentials and return http status code 201   \n", () => {
      it.skip("should register user with valid credentials", async () => {
        const new_user = {
          firstName: "milina",
          lastName: "lakhdar",
          username: "lakhdar24",
          email: "lakhdar@gmail.com",
          phone: "+2131111111",
          password: "f12345!q",
          role: "admin",
        };
        const { status } = await supertest(app)
          .post("/api/v1/auth/register")
          .send(new_user);

        expect(status).toBe(200);
      });
      it("shouldn't register user with invalid credentials and return http status code 400", async () => {
        const new_user = {
          firstName: "dodo",
          lastName: "lakhdar",
          username: "islam24",
          email: "dodo@gmail.com",
          phone: "+2131111111",
          password: "f12345!q",
          role: "admin",
        };
        const { status } = await supertest(app)
          .post("/api/v1/auth/register")
          .send(new_user);

        expect(status).toBe(400);
      });
    });
  });
}

export default register_unit_test;
