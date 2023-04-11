import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewActivityPropComponent } from './new-activity-prop.component';

describe('NewActivityPropComponent', () => {
  let component: NewActivityPropComponent;
  let fixture: ComponentFixture<NewActivityPropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewActivityPropComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewActivityPropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
