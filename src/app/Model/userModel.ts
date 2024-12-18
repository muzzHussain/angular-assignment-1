export class UserModel {
  id: number;
  first_name: string;
  last_name: string;
  city: string;
  state: string;
  zip: number;
  age: number;
  email: string;
  web: string;
  company_name: string;

  constructor(
    id: number,
    first_name: string,
    last_name: string,
    age: number,
    email: string,
    web: string,
    city: string,
    state: string,
    zip: number,
    company_name: string
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.age = age;
    this.email = email;
    this.web = web;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.company_name = company_name;
  }
}
