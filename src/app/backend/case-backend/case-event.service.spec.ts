import { TestBed, inject } from '@angular/core/testing';

import { CaseEventService } from './case-event.service';

describe('CaseEventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CaseEventService]
    });
  });

  it('should be created', inject([CaseEventService], (service: CaseEventService) => {
    expect(service).toBeTruthy();
  }));
});
