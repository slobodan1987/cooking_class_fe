import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * CurrentLanguageService is responsible for holding and managing the current language state of the application.
 * It uses a BehaviorSubject to allow components to subscribe to changes in the current language.
 * The initial language is set to 'hr' (Croatian).
 * This service can be injected into any component or service that needs to access or change the current language.
 */
@Injectable({
  providedIn: 'root',
})
export class CurrentLanguageService {
  constructor() {}

  /*
   * This BehaviorSubject holds the current language code
   */
  public currentLanguage$: BehaviorSubject<
    'hr' | 'en-US' | 'de' | 'it' | 'fr' | 'es' | 'cs' | null
  > = new BehaviorSubject<
    'hr' | 'en-US' | 'de' | 'it' | 'fr' | 'es' | 'cs' | null
  >('hr');

  /**
   * Sets the current language code and emits the new value to all subscribers.
   * @param languageCode - The new language code to set.
   */
  setLanguage(
    languageCode: 'hr' | 'en-US' | 'de' | 'it' | 'fr' | 'es' | 'cs' | null
  ): void {
    this.currentLanguage$.next(languageCode);
  }
}
