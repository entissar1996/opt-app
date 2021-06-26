import { Category } from "./category";

export interface IProduct{
  label: String,
  description: String,
  price?: Number,
  quantity?: Number,
  brand?: String,
  categories?:Category[],
  color?:String[],
  photo: String,
  pricepromo?:String,
  model3D?:String,
  token?: String;
}
