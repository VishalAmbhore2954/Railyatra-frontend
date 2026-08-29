import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tickit } from './tickit';

describe('Tickit', () => {
  let component: Tickit;
  let fixture: ComponentFixture<Tickit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tickit],
    }).compileComponents();

    fixture = TestBed.createComponent(Tickit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
