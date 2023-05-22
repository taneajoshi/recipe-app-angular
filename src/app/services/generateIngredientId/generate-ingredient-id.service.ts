import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenerateIngredientIdService {
  private nextId = 1;

  generateId(): number {
    const id = this.nextId;
    this.nextId++;
    return id;
  }
}
