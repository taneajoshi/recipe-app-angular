import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, from } from 'rxjs';
import { Router } from '@angular/router';
import { Observer } from 'gsap/all';
import { authResponseData } from '../interfaces/auth-response-data';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  error = '';

  constructor(private authService: AuthService,
     private spinner: NgxSpinnerService,
     private router: Router
     ){}
  ngOnInit(): void {
    document.body.classList.add('bg-light');
  }

  onSwitchMode(form: NgForm) {
    this.isLoginMode = !this.isLoginMode;
    form.reset();
    this.error = '';
  }

  onSubmit(authForm: NgForm) {
    let authObserver = Observer<authResponseData>;
    const email = authForm.value.email;
    const password = authForm.value.password;
    from(this.spinner.show())
    if(this.isLoginMode){
      //Code for login
      authObserver = this.authService.login(email, password)
    } else {
      //Code for SignUp
      authObserver = this.authService.signUp(email, password)
    }
    authForm.reset();

    authObserver.pipe(finalize(() => this.spinner.hide()))
    .subscribe(
      resData => {
        console.log(resData);
        this.router.navigateByUrl('/');
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
      }
    )
  }

  ngOnDestroy(): void {
    document.body.classList.remove('bg-light');
  }
}

