import { TestBed } from '@angular/core/testing';

import { AuthentificationService } from './authentification.service';

describe('AuthenficationService', () => {
  let service: AuthentificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthentificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
