import { TestBed } from '@angular/core/testing';

import { DatabaseService } from './database.service';

describe('DatabaseService', () => {
  let service: DatabaseService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
