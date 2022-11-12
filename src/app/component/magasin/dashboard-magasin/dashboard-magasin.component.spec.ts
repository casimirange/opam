import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMagasinComponent } from './dashboard-magasin.component';

describe('DashboardMagasinComponent', () => {
  let component: DashboardMagasinComponent;
  let fixture: ComponentFixture<DashboardMagasinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardMagasinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMagasinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
