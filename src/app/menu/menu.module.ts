import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    ContentComponent
  ]
})
export class MenuModule { }
