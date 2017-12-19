import { TestBed, inject } from '@angular/core/testing';

import { CaseBackendService } from './case-backend.service';

describe('CaseBackendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CaseBackendService]
    });
  });

  it('should be created', inject([CaseBackendService], (service: CaseBackendService) => {
    expect(service).toBeTruthy();
  }));
});
