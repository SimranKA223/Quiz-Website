import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getUserId(): any {
    return localStorage.getItem('id');
  }

}
