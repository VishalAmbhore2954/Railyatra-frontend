import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoach } from './add-coach';

describe('AddCoach', () => {
  let component: AddCoach;
  let fixture: ComponentFixture<AddCoach>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCoach],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCoach);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
