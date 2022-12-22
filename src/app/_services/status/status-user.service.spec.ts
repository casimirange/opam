import { TestBed } from '@angular/core/testing';

import { StatusUserService } from './status-user.service';

describe('StatusUserService', () => {
  let service: StatusUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
