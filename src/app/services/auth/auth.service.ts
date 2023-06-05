import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { authResponseData } from 'src/app/interfaces/auth-response-data';
import { User } from 'src/app/models/user.model';
import { StorageService } from '../storage/storage.service';
import { StorageKeys } from '../storage/storage-keys.enum';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient,
    private storageService: StorageService,
    private router: Router){}

  //SignUp
  signUp(email: string, password: string) {
   return this.http
    .post<authResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.FirebaseAPIKey, {
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
      }),
      tap(resData => {
        this.handleAuthentication(
          resData.email,
          resData.idToken,
          resData.idToken,
          +resData.expiresIn);
      })
    )
  }

  //Login
  login(email: string, password: string) {
    return this.http.post<authResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.FirebaseAPIKey, {
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
      }),
      tap(resData => {
        this.handleAuthentication(
          resData.email,
          resData.idToken,
          resData.idToken,
          +resData.expiresIn);
      })
    )
  }

  //Handle user authentication
  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    //generating expiration date
    const expirationDate = new Date(
      new Date().getTime() + expiresIn * 1000
    );
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    this.storageService.set(StorageKeys.UserData, user);
  }

  //auto login on page refresh (if token is not expired)
  autoLogin() {
    this.storageService.get(StorageKeys.UserData).subscribe(userData => {
      if (!userData) {
        return;
      }
      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );

      if(loadedUser.token) {
        this.user.next(loadedUser);
        const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.autoLogout(expirationDuration);
      }
    });
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  //Logout
  logout() {
    this.user.next(null);
    this.router.navigateByUrl('/login');
    this.storageService.remove(StorageKeys.UserData);
    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
}
