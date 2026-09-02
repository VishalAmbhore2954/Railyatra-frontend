import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStationList } from './admin-station-list';

describe('AdminStationList', () => {
  let component: AdminStationList;
  let fixture: ComponentFixture<AdminStationList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminStationList],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminStationList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
