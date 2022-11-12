import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeBonComponent } from './type-bon.component';

describe('TypeBonComponent', () => {
  let component: TypeBonComponent;
  let fixture: ComponentFixture<TypeBonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeBonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeBonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
