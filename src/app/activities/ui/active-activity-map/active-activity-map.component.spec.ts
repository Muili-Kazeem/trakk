import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveActivityMapComponent } from './active-activity-map.component';

describe('ActiveActivityMapComponent', () => {
  let component: ActiveActivityMapComponent;
  let fixture: ComponentFixture<ActiveActivityMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveActivityMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveActivityMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
