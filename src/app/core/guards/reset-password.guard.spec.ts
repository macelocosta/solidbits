import { TestBed } from '@angular/core/testing';

import { ResetPasswordGuard } from './reset-password.guard';

describe('ResetPasswordGuard', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResetPasswordGuard = TestBed.get(ResetPasswordGuard);
    expect(service).toBeTruthy();
  });
});
