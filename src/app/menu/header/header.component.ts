import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService,
    private authService: AuthService,
    private router: Router){}
  saveRecipes() {
    this.dataStorageService.storeRecipes();
  }

  fetchRecipes(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
