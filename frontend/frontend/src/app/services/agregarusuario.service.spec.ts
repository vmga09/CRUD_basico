import { TestBed } from '@angular/core/testing';

import { AgregarusuarioService } from './agregarusuario.service';

describe('AgregarusuarioService', () => {
  let service: AgregarusuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgregarusuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
