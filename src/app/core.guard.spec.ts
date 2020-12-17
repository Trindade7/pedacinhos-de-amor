import { TestBed } from '@angular/core/testing';

import { CoreGuard } from './core.guard';

describe('CoreGuard', () => {
  let guard: CoreGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CoreGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
