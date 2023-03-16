import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatPropComponent } from './stat-prop.component';

describe('StatPropComponent', () => {
  let component: StatPropComponent;
  let fixture: ComponentFixture<StatPropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatPropComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatPropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
