import { TestBed } from '@angular/core/testing';

import { ChartsRepositoryService } from './charts-repository.service';

describe('ChartsRepositoryService', () => {
  let service: ChartsRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartsRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
