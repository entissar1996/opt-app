import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../_models/api-response.model';
import { environment } from 'src/environments/environment';
import { IProduct } from '../../_models/products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient) { }

  postProduct(product:IProduct):Observable<IApiResponse>{
    return this.httpClient.post(`${environment.baseUri}/products`,product) as Observable<IApiResponse>;
  }
  deleteProduct(id){
    return this.httpClient.delete(`${environment.baseUri}/products/${id}`) as Observable<IApiResponse>;;
  }



  updateProduct(id,product):Observable<IApiResponse>{
     let _product={...product};
    return this.httpClient.put(`${environment.baseUri}/products/${id}`,_product) as Observable<IApiResponse>;
  }

  getAllProducts(){
    return this.httpClient.get(`${environment.baseUri}/products`) as Observable<IApiResponse>;
  }

  getProductById(id){
    return this.httpClient.get(`${environment.baseUri}/products/${id}`) as Observable<any>;
  }
}
