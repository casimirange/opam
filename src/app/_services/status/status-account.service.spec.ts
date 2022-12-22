import { TestBed } from '@angular/core/testing';

import { StatusAccountService } from './status-account.service';

describe('StatusAccountService', () => {
  let service: StatusAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
