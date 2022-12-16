import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexRequestOppositionComponent } from './index-request-opposition.component';

describe('IndexRequestOppositionComponent', () => {
  let component: IndexRequestOppositionComponent;
  let fixture: ComponentFixture<IndexRequestOppositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexRequestOppositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexRequestOppositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
