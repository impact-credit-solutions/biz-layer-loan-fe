import { TestBed } from '@angular/core/testing';

import { BalanceQueryService } from './balance-query.service';

describe('BalanceQueryService', () => {
  let service: BalanceQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BalanceQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
