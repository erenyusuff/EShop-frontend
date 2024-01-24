import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(userName: string, password: string): Observable<any> {
    return this.http.post(
      environment.api + '/auth/login',
      {
        userName,
        password,
      },
      httpOptions
    );
  }

  register(userName: string, email: string, password: string): Observable<any> {
    return this.http.post(
      environment.api + '/auth/register',
      {
        userName,
        email,
        password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(environment.api + '/auth/signout', { }, httpOptions);
  }
}
