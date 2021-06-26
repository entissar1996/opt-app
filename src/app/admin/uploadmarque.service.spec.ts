import { TestBed } from '@angular/core/testing';

import { UploadmarqueService } from './uploadmarque.service';

describe('UploadmarqueService', () => {
  let service: UploadmarqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadmarqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
