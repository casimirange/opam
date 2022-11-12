import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovisionnerComponent } from './approvisionner.component';

describe('ApprovisionnerComponent', () => {
  let component: ApprovisionnerComponent;
  let fixture: ComponentFixture<ApprovisionnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovisionnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovisionnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
