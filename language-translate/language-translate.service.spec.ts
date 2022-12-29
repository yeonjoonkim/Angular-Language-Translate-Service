import { TestBed } from '@angular/core/testing';

import { LanguageTranslateService } from './language-translate.service';

describe('LanguageTranslateService', () => {
  let service: LanguageTranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageTranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
