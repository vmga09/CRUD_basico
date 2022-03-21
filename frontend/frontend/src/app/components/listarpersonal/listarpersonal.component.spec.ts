import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarpersonalComponent } from './listarpersonal.component';

describe('ListarpersonalComponent', () => {
  let component: ListarpersonalComponent;
  let fixture: ComponentFixture<ListarpersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarpersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarpersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
