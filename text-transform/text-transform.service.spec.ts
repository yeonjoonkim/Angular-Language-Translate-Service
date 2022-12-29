import { TestBed } from '@angular/core/testing';

import { TextTransformService } from './text-transform.service';

describe('TextTransformService', () => {
  let service: TextTransformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextTransformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
