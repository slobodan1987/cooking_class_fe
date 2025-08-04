import { TestBed } from '@angular/core/testing';

import { HttpInteractionService } from './http-interaction.service';

describe('HttpInteractionService', () => {
  let service: HttpInteractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpInteractionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
