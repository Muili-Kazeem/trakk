import { TestBed } from '@angular/core/testing';

import { HandlemapService } from './handlemap.service';

describe('HandlemapService', () => {
  let service: HandlemapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandlemapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
