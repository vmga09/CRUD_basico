import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarpersonalComponent } from './agregarpersonal.component';

describe('AgregarpersonalComponent', () => {
  let component: AgregarpersonalComponent;
  let fixture: ComponentFixture<AgregarpersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarpersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarpersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
