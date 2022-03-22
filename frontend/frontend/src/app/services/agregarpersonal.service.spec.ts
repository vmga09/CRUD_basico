import { TestBed } from '@angular/core/testing';

import { AgregarpersonalService } from './agregarpersonal.service';

describe('AgregarpersonalService', () => {
  let service: AgregarpersonalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgregarpersonalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
