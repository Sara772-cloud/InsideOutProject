import { TestBed } from '@angular/core/testing';

import { AllTasksCountService } from './all-tasks-count.service';

describe('AllTasksCountService', () => {
  let service: AllTasksCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllTasksCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
