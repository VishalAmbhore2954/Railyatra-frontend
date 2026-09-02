import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSeats } from './add-seats';

describe('AddSeats', () => {
  let component: AddSeats;
  let fixture: ComponentFixture<AddSeats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSeats],
    }).compileComponents();

    fixture = TestBed.createComponent(AddSeats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
