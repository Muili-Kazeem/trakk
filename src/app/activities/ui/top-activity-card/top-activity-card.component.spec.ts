import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopActivityCardComponent } from './top-activity-card.component';

describe('TopActivityCardComponent', () => {
  let component: TopActivityCardComponent;
  let fixture: ComponentFixture<TopActivityCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopActivityCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopActivityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
