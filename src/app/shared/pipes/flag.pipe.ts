import { Pipe, PipeTransform } from '@angular/core';
import { LANGUAGES } from '../language-switcher/languages';

// This pipe is used to transform a language code into a corresponding flag image path
// It takes a language code as input and returns the path to the flag image
// If the language code is not found, it returns an empty string
// Usage: {{ 'hr' | flag }} will return '/assets/img/flags/flag-hr.svg'
// This pipe can be used in templates to display flags dynamically based on the selected language
// Make sure to import this pipe in your module to use it in your components
@Pipe({
  name: 'flag',
})
export class FlagPipe implements PipeTransform {
  // This method transforms the input language code into a flag image path
  // It searches for the language in the LANGUAGES array and returns the corresponding flag path
  // If the language is not found, it returns an empty string
  // This allows for easy display of flags in templates based on the selected language
  // Example: {{ 'hr' | flag }} will return '/assets/img/flags/flag-hr.svg'
  // This pipe can be used in conjunction with the LanguageSwitcherComponent to display the current language's flag
  transform(
    language: 'hr' | 'en-US' | 'de' | 'it' | 'fr' | 'es' | 'cs' | null
  ): string {
    return LANGUAGES.find((lang) => lang.code === language)?.flag as
      | '/assets/img/flags/flag-hr.svg'
      | '/assets/img/flags/flag-en.svg'
      | '/assets/img/flags/flag-de.svg'
      | '/assets/img/flags/flag-it.svg'
      | '/assets/img/flags/flag-fr.svg'
      | '/assets/img/flags/flag-es.svg'
      | '/assets/img/flags/flag-cz.svg';
  }
}
