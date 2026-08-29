import { TestBed } from '@angular/core/testing';

import { Tain } from './tain';

describe('Tain', () => {
  let service: Tain;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Tain);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
