import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityOnComponent } from './activity-on.component';

describe('ActivityOnComponent', () => {
  let component: ActivityOnComponent;
  let fixture: ComponentFixture<ActivityOnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityOnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityOnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
