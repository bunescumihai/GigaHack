import { TestBed } from '@angular/core/testing';

import { IncidentsRepositoryService } from './incidents-repository.service';

describe('IncidentsRepositoryService', () => {
  let service: IncidentsRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncidentsRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
