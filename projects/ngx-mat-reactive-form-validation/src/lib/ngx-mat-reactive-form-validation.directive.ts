import { Directive, DoCheck, Input, OnDestroy, OnInit, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NgxMatReactiveFormValidationService } from './ngx-mat-reactive-form-validation.service';

@Directive({
  selector: '[ngxFormValidation]'
})
export class NgxMatReactiveFormValidationDirective implements OnInit, DoCheck, OnDestroy {

  @Input() private readonly ngxFormValidationPadding: boolean;
  @Input() private readonly ngxFormValidationLabel: string;
  @Input('ngxFormValidation') private readonly input: AbstractControl;

  private inputStatusChangeSubscription: Subscription;
  private errorElement: any;
  private hasErrors: boolean;
  private form: FormGroup | FormArray;

  get shouldShowErrors(): boolean {
    return !!(this.input.touched && this.form.touched && this.input.errors);
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private renderer: Renderer2,
    private translate: TranslateService,
    private ngxMatReactiveValidationService: NgxMatReactiveFormValidationService
  ) {
    this.translate.setDefaultLang('en');
    this.translate.use('en').subscribe(() => {
      this.ngxMatReactiveValidationService.init('en');
    });
  }

  ngOnInit() {
    this.form = this.input.parent;
    this.viewContainer.createEmbeddedView(this.templateRef);
    const formField = this.templateRef.elementRef.nativeElement.previousSibling;
    this.errorElement = this.renderer.createElement('mat-error');
    this.renderer.addClass(this.errorElement, 'form-field-error');
    if (this.ngxFormValidationPadding) {
      this.renderer.addClass(this.errorElement, 'section-end');
    }
    this.renderer.setStyle(this.errorElement, 'display', 'hidden');
    this.renderer.appendChild(formField, this.errorElement);
    this.inputStatusChangeSubscription = this.input.statusChanges.subscribe((e) => {
      if (this.shouldShowErrors) {
        this.showErrors(this.input);
      } else {
        this.hideErrors();
      }
    });
  }

  ngDoCheck() {
    if (this.shouldShowErrors) {
      this.showErrors(this.input);
    } else {
      this.hideErrors();
    }
  }

  showErrors(input: AbstractControl) {
    this.hasErrors = true;
    const errors = Object.keys(input.errors).map((error) => {
      if (error.includes('length')) {
        return this.translate.instant(`${error}`, {
          field: this.ngxFormValidationLabel,
          length: input.errors[error].requiredLength,
        });
      } else if (error === 'fieldMatch') {
        return this.translate.instant(`${error}`, {
          field: this.ngxFormValidationLabel,
          matchField: input.errors[error].matchField,
        });
      } else if (error === 'requiresOne') {
        return this.translate.instant(`${error}`, {
          field: this.ngxFormValidationLabel,
          requiredFields: input.errors[error].requiredFields,
        });
      } else if (error === 'mask') {
        return this.translate.instant(`${error}`, {
          field: this.ngxFormValidationLabel,
          requiredMask: input.errors[error].requiredMask,
        });
      } else {
        return this.translate.instant(`${error}`, { field: this.ngxFormValidationLabel });
      }
    });
    const errorList = errors.join(' ');
    this.errorElement.style.display = 'block';
    this.errorElement.innerHTML = errorList;
  }

  hideErrors() {
    if (this.hasErrors) {
      this.hasErrors = false;
      this.errorElement.style.display = 'none';
      this.errorElement.innerHTML = '';
    }
  }

  ngOnDestroy() {
    this.inputStatusChangeSubscription.unsubscribe();
  }

}
