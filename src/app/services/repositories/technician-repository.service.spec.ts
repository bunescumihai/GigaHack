import { TestBed } from '@angular/core/testing';

import { TechnicianRepositoryService } from './technician-repository.service';

describe('TechnicianRepositoryService', () => {
  let service: TechnicianRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnicianRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
