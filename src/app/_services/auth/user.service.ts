import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../_models/api-response.model';
import { environment } from 'src/environments/environment';
import { User } from '../../_models/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  postUser(user:User):Observable<IApiResponse>{
      return this.httpClient.post(`${environment.baseUri}/users/register`,user) as Observable<IApiResponse>;
  }

  deleteUser(id){
    return this.httpClient.delete(`${environment.baseUri}/users/delete/${id}`) as Observable<IApiResponse>;;
  }

  updateUserRole(id,role):Observable<IApiResponse>{
   return this.httpClient.put(`${environment.baseUri}/users/update/role/${id}`,{"new_role":role}) as Observable<IApiResponse>;
  }

  updateUser(id,user):Observable<IApiResponse>{
     let _user={...user};
    return this.httpClient.put(`${environment.baseUri}/users/update/${id}`,_user) as Observable<IApiResponse>;
  }

  getAllUsers(){
    return this.httpClient.get(`${environment.baseUri}/users`) as Observable<IApiResponse>;
  }

  getUserById(id){
    return this.httpClient.get(`${environment.baseUri}/users/user/${id}`) as Observable<IApiResponse>;
  }

}
