/**
 * Language interface and constants for language switching functionality.
 * This file defines the structure of a language object and provides a list of available languages.
 * It is used in the LanguageSwitcherComponent to manage language selection and display flags.
 */
export interface Language {
  code: 'hr' | 'en-US' | 'de' | 'it' | 'fr' | 'es' | 'cs';
  name:
    | 'HRVATSKI'
    | 'ENGLISH'
    | 'DEUTSCH'
    | 'ITALIANO'
    | 'FRANÇAIS'
    | 'ESPAÑOL'
    | 'ČEŠTINA';
  flag:
    | '/assets/img/flags/flag-hr.svg'
    | '/assets/img/flags/flag-en.svg'
    | '/assets/img/flags/flag-de.svg'
    | '/assets/img/flags/flag-it.svg'
    | '/assets/img/flags/flag-fr.svg'
    | '/assets/img/flags/flag-es.svg'
    | '/assets/img/flags/flag-cz.svg';
}

/**
 * List of available languages with their codes, names, and flag paths.
 * This constant is used in the LanguageSwitcherComponent to populate the language selection dropdown.
 * Each language object contains a code, name, and the path to its corresponding flag image.
 */
export const LANGUAGES: Language[] = [
  { code: 'hr', name: 'HRVATSKI', flag: '/assets/img/flags/flag-hr.svg' },
  { code: 'en-US', name: 'ENGLISH', flag: '/assets/img/flags/flag-en.svg' },
  { code: 'de', name: 'DEUTSCH', flag: '/assets/img/flags/flag-de.svg' },
  { code: 'it', name: 'ITALIANO', flag: '/assets/img/flags/flag-it.svg' },
  { code: 'fr', name: 'FRANÇAIS', flag: '/assets/img/flags/flag-fr.svg' },
  { code: 'es', name: 'ESPAÑOL', flag: '/assets/img/flags/flag-es.svg' },
  { code: 'cs', name: 'ČEŠTINA', flag: '/assets/img/flags/flag-cz.svg' },
];
