import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCommandComponent } from './index-command.component';

describe('IndexCommandComponent', () => {
  let component: IndexCommandComponent;
  let fixture: ComponentFixture<IndexCommandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexCommandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
