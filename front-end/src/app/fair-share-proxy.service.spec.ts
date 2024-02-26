import { TestBed } from '@angular/core/testing';

import { FairShareProxyService } from './fair-share-proxy.service';

describe('FairShareProxyService', () => {
  let service: FairShareProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FairShareProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
