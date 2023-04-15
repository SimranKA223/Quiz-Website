import { TestBed } from '@angular/core/testing';

import { CateogoryService } from './cateogory.service';

describe('CateogoryService', () => {
  let service: CateogoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CateogoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
