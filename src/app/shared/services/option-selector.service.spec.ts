import { TestBed } from '@angular/core/testing';

import { OptionSelectorService } from './option-selector.service';

describe('OptionSelectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OptionSelectorService = TestBed.get(OptionSelectorService);
    expect(service).toBeTruthy();
  });
});
