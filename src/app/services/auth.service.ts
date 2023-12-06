import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from '../models/user';
import { filter, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURl = '/api/users'
  constructor(private http: HttpClient) { }

  createUser(user: User){
    return this.http.post(this.apiURl, user);
  }

  login(user: {email: string, password: string}){
    return this.http.get(this.apiURl).pipe(map(
      (data: any) => data?.filter(
      (data: any) => data?.email === user.email && data?.password === user.password
    )))
  }

  logout() {
    sessionStorage.clear();
  }

  isUserLoggedIn() {
    const userInfo: any = sessionStorage.getItem('user');
    if(userInfo){
      return of(true);
    }
    return of(false);
  }

  isAdmin() {
    const userInfo: any = sessionStorage.getItem('user');
    if(userInfo && JSON.parse(userInfo).role === 'admin'){
      return of(true);
    }else{
      return of(false);
    }
  }

  getUserInfo(){
    const userInfo: any = sessionStorage.getItem('user');
    return JSON.parse(userInfo);
  }

  getUserById(id: number){
    return this.http.get(`${this.apiURl}/${id}`);
  }

  updateUser(user: {name: string, email: string, mobile_no: string}, id: number){
    return this.http.patch(this.apiURl + `/${id}`, user);
  }

}
