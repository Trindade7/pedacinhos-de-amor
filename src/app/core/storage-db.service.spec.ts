import { TestBed } from '@angular/core/testing';

import { StorageDbService } from './storage-db.service';

describe('StorageDbService', () => {
  let service: StorageDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
