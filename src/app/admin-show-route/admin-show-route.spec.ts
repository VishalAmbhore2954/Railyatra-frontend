import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowRoute } from './admin-show-route';

describe('AdminShowRoute', () => {
  let component: AdminShowRoute;
  let fixture: ComponentFixture<AdminShowRoute>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminShowRoute],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminShowRoute);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
