import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenerateRecipeIdService {
  private nextId = 1;

  generateId(): number {
    const id = this.nextId;
    this.nextId++;
    console.log('ran henerateId '+id);
    return id;
  }
}
