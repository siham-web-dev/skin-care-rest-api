import supertest from "supertest";
import { Express } from "express";

function logout_unit_test(app: Express) {
  describe("Endpoint: /api/v1/auth/logout \n", () => {
    it.skip("should logout user with valid jwt token and return http status code 201  \n", async () => {
      const JWT_TOKEN =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uX2lkIjoyNjksInVzZXJuYW1lIjoiaXNsYW0yNCIsImlhdCI6MTcxOTU2NTUyNSwiZXhwIjoxNzIxMjkzNTI1fQ.D5PlCgYCHBnj7-3ur6Ue3f--_x0WTBCtV8H-Kf-g9XI";
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
    
    it("shouldn't logout user with already jwt token destroyed and return http status code 401  \n", async () => {
      const JWT_TOKEN =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uX2lkIjoyNjgsInVzZXJuYW1lIjoiaXNsYW0yNCIsImlhdCI6MTcxOTUyNjQxMCwiZXhwIjoxNzIxMjU0NDEwfQ.9yY_erlqmx2zTCAPTqqIGODhjE6jsDwvqSS9U_iipRw";
      const AUTHORIZATION_HEADER = `Bearer ${JWT_TOKEN}`;
      const {
        status,
        body: { error },
      } = await supertest(app)
        .delete("/api/v1/auth/logout")
        .set("Authorization", AUTHORIZATION_HEADER)
        .send();

      expect(status).toBe(401);
      expect(error).toBe("Invalid token ( session is not active )");
    });

    it("shouldn't logout user with invalid jwt token and return http status code 401  \n", async () => {
      const JWT_TOKEN =
        "eyJhaGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uX2lkIjo3NSwidXNlcm5hbWUiOiJpc2xhbTI0IiwiaWF0IjoxNzE5NTA5OTEwLCJleHAiOjE3MjEyMzc5MTB9.FKKYMYNcCj9MW8c0OZbFqK-ZvBEdYz9R-UU4JEzEz2I";
      const AUTHORIZATION_HEADER = `Bearer ${JWT_TOKEN}`;
      const {
        status,
      } = await supertest(app)
        .delete("/api/v1/auth/logout")
        .set("Authorization", AUTHORIZATION_HEADER)
        .send();

      expect(status).toBe(500);
    });
  });
}

export default logout_unit_test;
