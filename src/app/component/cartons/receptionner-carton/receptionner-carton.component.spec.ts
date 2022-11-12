import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionnerCartonComponent } from './receptionner-carton.component';

describe('ReceptionnerCartonComponent', () => {
  let component: ReceptionnerCartonComponent;
  let fixture: ComponentFixture<ReceptionnerCartonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceptionnerCartonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionnerCartonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
