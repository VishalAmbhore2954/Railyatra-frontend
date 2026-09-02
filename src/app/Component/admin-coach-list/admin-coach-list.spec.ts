import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCoachList } from './admin-coach-list';

describe('AdminCoachList', () => {
  let component: AdminCoachList;
  let fixture: ComponentFixture<AdminCoachList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCoachList],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminCoachList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
