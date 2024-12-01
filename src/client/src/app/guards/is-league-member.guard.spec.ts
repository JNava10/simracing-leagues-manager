import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isLeagueMemberGuard } from './is-league-member.guard';

describe('isLeagueMemberGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isLeagueMemberGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
