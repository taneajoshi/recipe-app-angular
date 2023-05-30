import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { authResponseData } from 'src/app/interfaces/auth-response-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient){}
  signUp(email: string, password: string) {
   return this.http
    .post<authResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDjSsnl0kajSC75WX710Spqm08izPL2FF8', {
      email: email,
      password: password,
      //As per firebase Api Docs returnSecureToken should always be true
      returnSecureToken: true,
    })
  }
}
