import { TestBed } from '@angular/core/testing';

import { NgxMatReactiveFormValidationService } from './ngx-mat-reactive-form-validation.service';

describe('NgxMatReactiveFormValidationService', () => {
  let service: NgxMatReactiveFormValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxMatReactiveFormValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
