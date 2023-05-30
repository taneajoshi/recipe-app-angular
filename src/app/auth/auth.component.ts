import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, from } from 'rxjs';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {
  isLoginMode = true;
  emailError = '';
  passwordError = '';
  constructor(private authService: AuthService, private spinner: NgxSpinnerService){}
  ngOnInit(): void {
    document.body.classList.add('bg-light');
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    const email = authForm.value.email;
    const password = authForm.value.password;
    from(this.spinner.show())
    if(this.isLoginMode){
      //Code for login
      this.authService.login(email, password)
      .pipe(finalize(() => this.spinner.hide()))
        .subscribe(data => {
            console.log(data);
          },
          errorMessage => {
            this.passwordError = errorMessage;
          }
        );
    } else {
      //Code for SignUp
      this.authService.signUp(email, password)
        .pipe(finalize(() => this.spinner.hide()))
        .subscribe(data => {
            console.log(data);
          },
          errorMessage => {
            this.emailError = errorMessage;
          });
    }
    authForm.reset();
  }
}

