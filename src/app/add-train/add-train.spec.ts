import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrain } from './add-train';

describe('AddTrain', () => {
  let component: AddTrain;
  let fixture: ComponentFixture<AddTrain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTrain],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTrain);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
