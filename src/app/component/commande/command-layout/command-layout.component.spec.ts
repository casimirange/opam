import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandLayoutComponent } from './command-layout.component';

describe('CommandLayoutComponent', () => {
  let component: CommandLayoutComponent;
  let fixture: ComponentFixture<CommandLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
