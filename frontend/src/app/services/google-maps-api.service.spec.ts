import { TestBed } from '@angular/core/testing';

import { GoogleMapsAPIService } from './google-maps-api.service';

describe('GoogleMapsAPIService', () => {
  let service: GoogleMapsAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleMapsAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
