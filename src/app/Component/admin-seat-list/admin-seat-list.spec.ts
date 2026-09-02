import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSeatList } from './admin-seat-list';

describe('AdminSeatList', () => {
  let component: AdminSeatList;
  let fixture: ComponentFixture<AdminSeatList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSeatList],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminSeatList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
