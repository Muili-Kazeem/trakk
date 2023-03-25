import { TestBed } from '@angular/core/testing';

import { ActivityOnGuard } from './activity-on.guard';

describe('ActivityOnGuard', () => {
  let guard: ActivityOnGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ActivityOnGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
