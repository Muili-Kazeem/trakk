import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesShellComponent } from './activities-shell.component';

describe('ActivitiesShellComponent', () => {
  let component: ActivitiesShellComponent;
  let fixture: ComponentFixture<ActivitiesShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitiesShellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitiesShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
