import { ComponentFixture, TestBed } from '@angular/core/testing';

import { COMPONENTESComponent } from './componentes.component';

describe('COMPONENTESComponent', () => {
  let component: COMPONENTESComponent;
  let fixture: ComponentFixture<COMPONENTESComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ COMPONENTESComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(COMPONENTESComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
