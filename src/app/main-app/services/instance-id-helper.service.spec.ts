import { TestBed } from '@angular/core/testing';

import { InstanceIdHelperService } from './instance-id-helper.service';

describe('InstanceIdHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstanceIdHelperService = TestBed.get(InstanceIdHelperService);
    expect(service).toBeTruthy();
  });
});
