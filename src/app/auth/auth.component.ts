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
  constructor(private authService: AuthService, private spinner: NgxSpinnerService){}
  ngOnInit(): void {
    document.body.classList.add('bg-light');
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  // onSubmit(authForm: NgForm) {
  //   const email = authForm.value.email;
  //   const password = authForm.value.password;
  //   from(this.spinner.show())
  //   .pipe(finalize(() => this.spinner.hide()))
  //   this.authService.signUp(email, password).subscribe(data => {
  //     console.log(data);
  //   },
  //   error => {
  //     console.log(error);
  //   });
  //   authForm.reset;
  // }

  onSubmit(authForm: NgForm) {
    const email = authForm.value.email;
    const password = authForm.value.password;
    from(this.spinner.show())
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(() => {
        this.authService.signUp(email, password).subscribe(
          data => {
            console.log(data);
          },
          error => {
            console.log(error);
          }
        );
      });
    authForm.reset();
  }
}

