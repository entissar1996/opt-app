import { IProduct } from './products.model';
export interface Marque {
label:  string,
logo?: string,
products?:IProduct[]
}
