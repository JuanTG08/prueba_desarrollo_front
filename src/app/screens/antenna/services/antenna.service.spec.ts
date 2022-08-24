import { TestBed } from '@angular/core/testing';

import { AntennaService } from './antenna.service';

describe('AntennaService', () => {
  let service: AntennaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AntennaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
