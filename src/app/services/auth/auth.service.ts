import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { authResponseData } from 'src/app/interfaces/auth-response-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient){}

  //SignUp
  signUp(email: string, password: string) {
   return this.http
    .post<authResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDjSsnl0kajSC75WX710Spqm08izPL2FF8', {
      email: email,
      password: password,
      //As per firebase Api Docs returnSecureToken should always be true
      returnSecureToken: true,
    }).pipe(
      catchError(errorRes => {
        let errorMessage = "Something went wrong!";
        if(!errorRes.error || !errorRes.error.error) {
          return throwError(errorMessage);
        }
        switch(errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'This email already exists.'
        }
        return throwError(errorMessage);
      })
    )
  }

  //Login
  login(email: string, password: string) {
    return this.http.post<authResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDjSsnl0kajSC75WX710Spqm08izPL2FF8', {
      email: email,
      password: password,
      //As per firebase Api Docs returnSecureToken should always be true
      returnSecureToken: true,
    }).pipe(
      catchError(errorRes => {
        let errorMessage = "Something went wrong!";
        if(!errorRes.error || !errorRes.error.error) {
          return throwError(errorMessage);
        }
        switch(errorRes.error.error.message) {
          case 'INVALID_PASSWORD':
            errorMessage = 'Password is invalid.'
        }
        return throwError(errorMessage);
      })
    )
  }
}
