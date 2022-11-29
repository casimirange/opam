import { TestBed } from '@angular/core/testing';

import { CartonService } from './carton.service';

describe('CartonService', () => {
  let service: CartonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
