import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {
  isLoginMode = true;
  ngOnInit(): void {
    document.body.classList.add('bg-light');
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}

