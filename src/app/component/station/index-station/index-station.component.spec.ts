import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexStationComponent } from './index-station.component';

describe('IndexStationComponent', () => {
  let component: IndexStationComponent;
  let fixture: ComponentFixture<IndexStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexStationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
