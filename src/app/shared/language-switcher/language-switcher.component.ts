import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FlagPipe } from '../pipes/flag.pipe';
import { Language, LANGUAGES } from './languages';

interface LanguageForm {
  language: FormControl<
    'hr' | 'en-US' | 'de' | 'it' | 'fr' | 'es' | 'cs' | null
  >;
}

/**
 * LanguageSwitcherComponent allows users to switch between different languages.
 * It provides a dropdown to select the language and updates the application state accordingly.
 * The selected language is saved in localStorage and can be retrieved on page load.
 * The component also updates the URL path based on the selected language.
 */
@Component({
  selector: 'app-language-switcher',
  imports: [CommonModule, ReactiveFormsModule, FlagPipe],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss',
})
export class LanguageSwitcherComponent implements OnInit {
  constructor() {}
  languages: Language[] = LANGUAGES;
  form: FormGroup<LanguageForm> = new FormGroup<LanguageForm>({
    language: new FormControl<
      'hr' | 'en-US' | 'de' | 'it' | 'fr' | 'es' | 'cs' | null
    >({
      value: 'hr',
      disabled: false,
    }),
  });

  ngOnInit(): void {
    // Get the language code from the URL path or localStorage
    const directPath = window.location.pathname;
    let codeFromPath = 'hr';
    if (directPath?.includes('/hr')) {
      codeFromPath = 'hr';
    }
    if (directPath?.includes('/en-US')) {
      codeFromPath = 'en-US';
    }
    if (directPath?.includes('/de')) {
      codeFromPath = 'de';
    }
    if (directPath?.includes('/it')) {
      codeFromPath = 'it';
    }
    if (directPath?.includes('/fr')) {
      codeFromPath = 'fr';
    }
    if (directPath?.includes('/es')) {
      codeFromPath = 'es';
    }
    if (directPath?.includes('/cs')) {
      codeFromPath = 'cs';
    }

    const saved = window.localStorage.getItem('selectedLanguage') ?? 'hr';

    const finalCode = codeFromPath ?? saved ?? 'hr';

    this.form.setValue({
      language: finalCode as
        | 'hr'
        | 'en-US'
        | 'de'
        | 'it'
        | 'fr'
        | 'es'
        | 'cs'
        | null,
    });

    this.setLanguage(finalCode);
  }

  switchLanguage(event: Event): void {
    const code = event.target
      ? (event.target as HTMLSelectElement).value
      : null;
    const codeNormalized = code?.trim();
    this.form.setValue({
      language: code as
        | 'hr'
        | 'en-US'
        | 'de'
        | 'it'
        | 'fr'
        | 'es'
        | 'cs'
        | null,
    });
    this.setLanguage(codeNormalized);
  }
  setLanguage(code: any): void {
    let newPath: string = '/hr';
    if (code === 'hr') {
      newPath = '/hr';
    }
    if (code === 'de') {
      newPath = '/de';
    }
    if (code === 'es') {
      newPath = '/es';
    }
    if (code === 'fr') {
      newPath = '/fr';
    }
    if (code === 'it') {
      newPath = '/it';
    }
    if (code === 'cs') {
      newPath = '/cs';
    }
    if (code === 'en-US') {
      newPath = '/en-US';
    }

    // Only if we are not already on that page
    if (window.location.pathname !== newPath) {
      window.localStorage.setItem('selectedLanguage', code);
      window.location.href = newPath;
    }
  }
}
