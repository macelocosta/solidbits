export class Business {
  _id?: string;
  name: string;
  abbrev?: string;
  location: string;
  children?: any;

  constructor(id, name, abbrev, location, children) {
    this.name = name;
    this.abbrev = abbrev;
    this.location = location;
    this.children = children;
  }
}