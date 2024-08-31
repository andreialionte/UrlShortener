import { TestBed } from '@angular/core/testing';

import { UrlshortenService } from './urlshorten.service';

describe('UrlshortenService', () => {
  let service: UrlshortenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlshortenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
