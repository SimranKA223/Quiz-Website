import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //we created subject..we can send data using it..those who are subscribing subject..
  //and when next is called via subscribe..it will get notified
  public loginStatusSubject=new Subject<boolean>();

  constructor(private http: HttpClient) { }

  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }

  public generateToken(loginData: any){
    return this.http.post(`${baseUrl}/generate-token`,loginData);
  }

  //login user: set token in localStorage
  
  public loginUser(token: any){
    localStorage.setItem('token',token);
    return true;
  }

  //if logged in or not
  public isLoggedIn(){
    let tokenstr=localStorage.getItem('token');
    if(tokenstr==undefined || tokenstr=='' || tokenstr==null){
      return false;
    }else{
      return true;
    }
  }
  //logout
  public logout(){
    localStorage.removeItem("token");
    localStorage.removeItem('user');
    return true;
  }

  //getToken
  public getToken(){
    return localStorage.getItem('token');
  }

  //set userDetail
  public setUser(user: any){
    localStorage.setItem('user',JSON.stringify(user));
  }

  //getUser
  public getUser(){
    let userStr=localStorage.getItem("user");
    if(userStr!=null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }

  }

  //get user role
  public getUserRole(){
    let user=this.getUser();
    return user.authorities[0].authority;
  }

  public getUserId(){
    let user=this.getUser();
    return user.id;
  }
}
