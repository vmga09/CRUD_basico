import { TestBed } from '@angular/core/testing';

import { EditarpersonalService } from './editarpersonal.service';

describe('EditarpersonalService', () => {
  let service: EditarpersonalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditarpersonalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
