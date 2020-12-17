import {TestBed} from '@angular/core/testing';

import {DatabaseGenericService} from './database-generic.service';

describe('DatabaseGenericService', () => {
  let service: DatabaseGenericService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseGenericService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
