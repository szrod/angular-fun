import { TestBed, inject } from '@angular/core/testing';

import { CaseProviderService } from './case-provider.service';

describe('CaseProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CaseProviderService]
    });
  });

  it('should be created', inject([CaseProviderService], (service: CaseProviderService) => {
    expect(service).toBeTruthy();
  }));
});
