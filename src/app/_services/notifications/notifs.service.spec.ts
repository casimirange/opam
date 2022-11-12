import { TestBed } from '@angular/core/testing';

import { NotifsService } from './notifs.service';

describe('NotifsService', () => {
  let service: NotifsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotifsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
