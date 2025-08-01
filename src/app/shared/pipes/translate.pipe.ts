import { Pipe, PipeTransform } from '@angular/core';
import { TRANSLATIONS } from '../../../translations/translations';

// This pipe is used to translate text based on the current language
// It takes an identifier and a language code, and returns the corresponding translation
// If no translation is found, it returns null
// Usage: {{ 'welcome' | translate: currentLanguage }}
// where 'welcome' is the key in the translations object and currentLanguage is the language code
// Example: {{ 'welcome' | translate: 'en-US' }} will return 'Welcome' if the current language is English
// This pipe can be used in templates to display translated text dynamically based on the selected language
// It is a simple and efficient way to handle translations in Angular applications
// Make sure to import this pipe in your module to use it in your components
@Pipe({
  name: 'translate',
})
export class TranslatePipe implements PipeTransform {
  // This method transforms the input by looking up the translation for the given identifier
  // in the TRANSLATIONS object based on the provided language code
  // If the translation exists, it returns the translated string; otherwise, it returns null
  transform(
    identificator: keyof typeof TRANSLATIONS,
    languageCode: 'hr' | 'en-US' | 'de' | 'it' | 'fr' | 'es' | 'cs'
  ): string | null {
    const translation = TRANSLATIONS[identificator];
    return translation ? translation[languageCode] || null : null;
  }
}
