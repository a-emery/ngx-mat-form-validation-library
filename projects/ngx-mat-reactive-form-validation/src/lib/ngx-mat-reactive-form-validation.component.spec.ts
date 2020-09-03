import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMatReactiveFormValidationComponent } from './ngx-mat-reactive-form-validation.component';

describe('NgxMatReactiveFormValidationComponent', () => {
  let component: NgxMatReactiveFormValidationComponent;
  let fixture: ComponentFixture<NgxMatReactiveFormValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxMatReactiveFormValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMatReactiveFormValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
