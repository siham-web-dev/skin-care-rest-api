import supertest from "supertest";
import { Express } from 'express';

function register_unit_test(app: Express) {
    describe("Endpoint: /api/v1/auth/register \n", () => {
      describe("should user register with right credentials and return http status code 201   \n", () => {
         it("should register user with valid credentials", async () => {
            const new_user = {
               "firstName": "oussama",
               "lastName": "heddi",
               "username": "oussama24",
               "email": "oussama@gmail.com",
               "phone": "+21312121",
               "password": "f12345!q",
               "role": "admin"
            }
            const { status } = await supertest(app).post("/api/v1/auth/register")
              .send(new_user)
            
            expect(status).toBe(200);
         })
      });
     });    
}

export default register_unit_test