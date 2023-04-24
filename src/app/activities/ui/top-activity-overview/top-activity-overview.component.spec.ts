import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopActivityOverviewComponent } from './top-activity-overview.component';

describe('TopActivityOverviewComponent', () => {
  let component: TopActivityOverviewComponent;
  let fixture: ComponentFixture<TopActivityOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopActivityOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopActivityOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
