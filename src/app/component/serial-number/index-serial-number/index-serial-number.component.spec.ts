import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexSerialNumberComponent } from './index-serial-number.component';

describe('IndesSerialNumberComponent', () => {
  let component: IndexSerialNumberComponent;
  let fixture: ComponentFixture<IndexSerialNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexSerialNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexSerialNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
