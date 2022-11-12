import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarnetComponent } from './add-carnet.component';

describe('AddCarnetComponent', () => {
  let component: AddCarnetComponent;
  let fixture: ComponentFixture<AddCarnetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCarnetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCarnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
