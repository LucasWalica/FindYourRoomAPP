import { TestBed } from '@angular/core/testing';

import { HousingRequestsService } from './housing-requests.service';

describe('HousingRequestsService', () => {
  let service: HousingRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HousingRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
