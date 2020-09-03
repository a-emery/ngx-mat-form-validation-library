import { Injectable, InjectionToken, Optional, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { translations } from './assets/en';

export const NGX_VALIDATION_TRANSLATIONS = new InjectionToken<any>('NGX_VALIDATION_TRANSLATIONS');

@Injectable({
  providedIn: 'root'
})
export class NgxMatReactiveFormValidationService {
  availableLanguages = translations;

  constructor(
    private translateService: TranslateService,
    @Optional() @Inject(NGX_VALIDATION_TRANSLATIONS) private injectedTranslations: any) {
    this.availableLanguages = this.setLanguages(translations, injectedTranslations);
    console.log(this.availableLanguages);
  }

  public init(language: string = null): any {
    if (language) {
      this.translateService.setTranslation(language, this.availableLanguages[language], true);
    } else {
      Object.keys(this.availableLanguages).forEach((availableLanguage) => {
        this.translateService.setTranslation(language, this.availableLanguages[availableLanguage], true);
      });
    }
  }

  setLanguages(defaultTranslations, overrides) {
    if (overrides) {
      Object.keys(overrides).map(value => {
        if (defaultTranslations[value]) {
          Object.keys(overrides[value]).map(nestedValue => {
            defaultTranslations[value][nestedValue] = overrides[value][nestedValue];
          });
        } else {
          defaultTranslations[value] = overrides[value];
        }
      });
    }
    return defaultTranslations;
  }
}
