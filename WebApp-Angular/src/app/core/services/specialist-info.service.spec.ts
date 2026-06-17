import { TestBed } from '@angular/core/testing';

import { SpecialistInfoService } from './specialist-info.service';

describe('SpecialistInfoService', () => {
  let service: SpecialistInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialistInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
