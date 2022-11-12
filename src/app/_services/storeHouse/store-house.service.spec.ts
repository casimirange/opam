import { TestBed } from '@angular/core/testing';

import { StoreHouseService } from './store-house.service';

describe('StoreHouseService', () => {
  let service: StoreHouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreHouseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
