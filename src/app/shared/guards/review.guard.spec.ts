import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { reviewGuard } from './review.guard';

describe('reviewGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => reviewGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
