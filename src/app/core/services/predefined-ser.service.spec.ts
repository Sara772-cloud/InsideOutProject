import { TestBed } from '@angular/core/testing';

import { PredefinedSerService } from './predefined-ser.service';

describe('PredefinedSerService', () => {
  let service: PredefinedSerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PredefinedSerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
