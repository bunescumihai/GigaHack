import { TestBed } from '@angular/core/testing';

import { AgencyRepositoryService } from './agency-repository.service';

describe('AgencyRepositoryService', () => {
  let service: AgencyRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgencyRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
