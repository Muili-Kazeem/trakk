import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentActivityCardComponent } from './recent-activity-card.component';

describe('RecentActivityCardComponent', () => {
  let component: RecentActivityCardComponent;
  let fixture: ComponentFixture<RecentActivityCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentActivityCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentActivityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
