export class User {
  _id?: string;
  name: string;
  surname?: string;
  email: string;
  password?: string;

  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
}