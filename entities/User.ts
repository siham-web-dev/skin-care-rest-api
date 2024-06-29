import Company from "./Company";
import Message from "./Message";
import Order from "./Order";
import { Role } from "./types/enum";

class User {
   id: number;
   firstName: string;
   lastName: string;
   username: string;
   password: string;
   role: Role;
   email: string;
   phone: string;

  constructor(
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    role: Role,
    email: string,
    phone: string,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.role = role;
    this.email = email;
    this.phone = phone;
  }
}

export default User;
