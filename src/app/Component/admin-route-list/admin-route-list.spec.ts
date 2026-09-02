import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRouteList } from './admin-route-list';

describe('AdminRouteList', () => {
  let component: AdminRouteList;
  let fixture: ComponentFixture<AdminRouteList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRouteList],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminRouteList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
