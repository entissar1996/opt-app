import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/_models/api-response.model';
import { environment } from 'src/environments/environment';
import { Category } from "../../_models/category";
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient:HttpClient) { }

  postCategory(category:Category):Observable<IApiResponse>{
    return this.httpClient.post(`${environment.baseUri}/category`,category) as Observable<IApiResponse>;
  }
  deleteCategory(id){
    return this.httpClient.delete(`${environment.baseUri}/category/${id}`) as Observable<IApiResponse>;;
  }



  updateCategory(id,category):Observable<IApiResponse>{
     let _category={...category};
    return this.httpClient.put(`${environment.baseUri}/category/${id}`,_category) as Observable<IApiResponse>;
  }

  getAllCategorys(){
    return this.httpClient.get(`${environment.baseUri}/category`) as Observable<IApiResponse>;
  }

  getCategoryById(id){
    return this.httpClient.get(`${environment.baseUri}/category/${id}`) as Observable<any>;
  }
}
