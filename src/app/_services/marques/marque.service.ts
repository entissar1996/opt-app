import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/_models/api-response.model';
import { Marque } from 'src/app/_models/marque';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarqueService {

  constructor(private httpClient:HttpClient) { }

  postMarque(marque:Marque):Observable<IApiResponse>{
    return this.httpClient.post(`${environment.baseUri}/marque`,marque) as Observable<IApiResponse>;
  }
  deleteMarque(id){
    return this.httpClient.delete(`${environment.baseUri}/marque/${id}`) as Observable<IApiResponse>;;
  }



  updateMarque(id,marque):Observable<IApiResponse>{
     let _marque={...marque};
    return this.httpClient.put(`${environment.baseUri}/marque/${id}`,_marque) as Observable<IApiResponse>;
  }

  getAllMarques(){
    return this.httpClient.get(`${environment.baseUri}/marque`) as Observable<IApiResponse>;
  }

  getProductById(id){
    return this.httpClient.get(`${environment.baseUri}/marque/${id}`) as Observable<any>;
  }
}
