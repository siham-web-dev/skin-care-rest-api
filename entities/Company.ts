class Company {
  id?: number;
  name: string;
  email: string;
  address: string;
  userId?: number;
  phone: string;
  logo_url?: string;

  constructor(
    name: string,
    email: string,
    address: string,
    phone: string,
    userId?: number,
    logo_url?: string,
    id?: number
  ) {
    this.name = name;
    this.email = email;
    this.address = address;
    this.userId = userId;
    this.phone = phone;
    this.logo_url = logo_url;
    this.id = id;
  }
}

export default Company;
