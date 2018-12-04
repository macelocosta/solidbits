export class Node {
  _id?:string;
  name:string;
  type:string;
  status:number;
  parent?:string;
  path?:string;
  location?:string;
  children?:any;
}