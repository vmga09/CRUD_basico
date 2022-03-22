import { TestBed } from '@angular/core/testing';

import { ListarpersonalService } from './listarpersonal.service';

describe('ListarpersonalService', () => {
  let service: ListarpersonalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListarpersonalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
