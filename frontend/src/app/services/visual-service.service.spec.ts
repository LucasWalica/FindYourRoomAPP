import { TestBed } from '@angular/core/testing';

import { VisualServiceService } from './visual-service.service';

describe('VisualServiceService', () => {
  let service: VisualServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisualServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
