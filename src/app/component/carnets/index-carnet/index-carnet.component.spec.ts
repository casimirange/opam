import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCarnetComponent } from './index-carnet.component';

describe('IndexCarnetComponent', () => {
  let component: IndexCarnetComponent;
  let fixture: ComponentFixture<IndexCarnetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexCarnetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexCarnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
