import { TestBed } from '@angular/core/testing';

import { GenerateRecipeIdService } from './generate-recipe-id.service';

describe('GenerateRecipeIdService', () => {
  let service: GenerateRecipeIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateRecipeIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
