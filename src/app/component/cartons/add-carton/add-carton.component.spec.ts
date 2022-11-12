import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCartonComponent } from './add-carton.component';

describe('AddCartonComponent', () => {
  let component: AddCartonComponent;
  let fixture: ComponentFixture<AddCartonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCartonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCartonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
