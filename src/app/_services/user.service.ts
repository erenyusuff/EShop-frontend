import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
import {User} from "../board-user/user.model";
import {product} from "../products/products.model";
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  getPublicContent(): Observable<any> {
    return this.http.get(environment.api + '/users/logout', {responseType: 'text'});
  }

  getUserBoard(): Observable<any> {
    return this.http.get<User[]>(environment.api + '/auth/profile');
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(environment.api + '/mod', {responseType: 'text'});
  }

  isAdmin(): Observable<any> {
    return this.http.get(environment.api + '/admin/kontrol', {responseType: 'text'})
  }
}
