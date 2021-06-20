import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/_models/api-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) { }
  getPublicContent(): Observable<any> {
    return this.http.get(`${environment.baseUri}/all`)as Observable<IApiResponse>;
  }


  getUserBoard(): Observable<any> {

    return this.http.get(`${environment.baseUri}/users`)as Observable<IApiResponse>;
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(`${environment.baseUri}/user`)as Observable<IApiResponse>;
  }
}
