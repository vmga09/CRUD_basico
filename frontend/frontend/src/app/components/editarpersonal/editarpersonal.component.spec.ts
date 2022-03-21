import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarpersonalComponent } from './editarpersonal.component';

describe('EditarpersonalComponent', () => {
  let component: EditarpersonalComponent;
  let fixture: ComponentFixture<EditarpersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarpersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarpersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
