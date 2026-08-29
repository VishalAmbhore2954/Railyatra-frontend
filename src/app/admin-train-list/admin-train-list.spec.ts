import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTrainList } from './admin-train-list';

describe('AdminTrainList', () => {
  let component: AdminTrainList;
  let fixture: ComponentFixture<AdminTrainList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTrainList],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminTrainList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
