import { TestBed } from '@angular/core/testing';

import { CurrentLanguageSharedService } from './current-language-shared.service';

describe('CurrentLanguageSharedService', () => {
  let service: CurrentLanguageSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentLanguageSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
