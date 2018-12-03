export class Business {
  _id?: string;
  name: string;
  abbrev?: string;
  location: string;
  floors?: [{
    name: string;
  }];

  constructor(id, name, abbrev, location, floors) {
    this.name = name;
    this.abbrev = abbrev;
    this.location = location;
    this.floors = floors;
  }
}