import { TestBed, inject } from '@angular/core/testing';

import { CurrentCasesService } from './current-cases.service';

describe('CurrentCasesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentCasesService]
    });
  });

  it('should be created', inject([CurrentCasesService], (service: CurrentCasesService) => {
    expect(service).toBeTruthy();
  }));
});
