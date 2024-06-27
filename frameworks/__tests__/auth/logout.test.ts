import supertest from "supertest";
import { Express } from "express";

function logout_unit_test(app: Express) {
  describe("Endpoint: /api/v1/auth/logout \n", () => {
    it("should logout user with right jwt token and return http status code 201  \n", async () => {
      const JWT_TOKEN =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uX2lkIjo5NiwidXNlcm5hbWUiOiJpc2xhbTI0IiwiaWF0IjoxNzE5NTEwOTM4LCJleHAiOjE3MjEyMzg5Mzh9.TtupIkHnn2yY5nwO1KkSe193jqpfUWAaaf7vXWCKVPo";
      const AUTHORIZATION_HEADER = `Bearer ${JWT_TOKEN}`;
      const {
        status,
        body: { message },
      } = await supertest(app)
        .delete("/api/v1/auth/logout")
        .set("Authorization", AUTHORIZATION_HEADER)
        .send();

      expect(status).toBe(201);
      expect(message).toBe("logout success");
    });

    it("shouldn't logout user with wrong jwt token and return http status code 401  \n", async () => {
      const JWT_TOKEN =
        "eyJhaGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uX2lkIjo3NSwidXNlcm5hbWUiOiJpc2xhbTI0IiwiaWF0IjoxNzE5NTA5OTEwLCJleHAiOjE3MjEyMzc5MTB9.FKKYMYNcCj9MW8c0OZbFqK-ZvBEdYz9R-UU4JEzEz2I";
      const AUTHORIZATION_HEADER = `Bearer ${JWT_TOKEN}`;
      const {
        status,
      } = await supertest(app)
        .delete("/api/v1/auth/logout")
        .set("Authorization", AUTHORIZATION_HEADER)
        .send();

      expect(status).toBe(401);
    });
  });
}

export default logout_unit_test;
