import { TestBed } from '@angular/core/testing';

import { MvtStockService } from './mvt-stock.service';

describe('MvtStockService', () => {
  let service: MvtStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MvtStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
