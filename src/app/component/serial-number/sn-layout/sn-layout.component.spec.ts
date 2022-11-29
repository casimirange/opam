import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnLayoutComponent } from './sn-layout.component';

describe('SnLayoutComponent', () => {
  let component: SnLayoutComponent;
  let fixture: ComponentFixture<SnLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
