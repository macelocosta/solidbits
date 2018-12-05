export class Business {
  _id?: string;
  name: string;
  abbrev?: string;
  location: string;
  floors?: [{
    name: string;
  }];
  children?: any[];

  constructor(id, name, abbrev, location, floors, children) {
    this.name = name;
    this.abbrev = abbrev;
    this.location = location;
    this.floors = floors;
    this.children = children;
  }
}