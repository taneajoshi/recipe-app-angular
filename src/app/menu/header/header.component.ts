import { Component } from '@angular/core';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService){}
  saveRecipes() {
    this.dataStorageService.storeRecipes();
  }

  fetchRecipes(){
    this.dataStorageService.fetchRecipes();
  }
}
