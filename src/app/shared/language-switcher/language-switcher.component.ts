import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FlagPipe } from '../pipes/flag.pipe';
import { Language, LANGUAGES } from './languages';
import { CurrentLanguageService } from '../services/current-language.service';

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
  constructor(private currentLanguageService: CurrentLanguageService) {}
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
    /**
     * Retrieve the language code from the URL path or localStorage.
     * If the language code is not found, default to 'hr'.
     * The language code is used to set the initial value of the form control.
     */
    const saved = window.localStorage.getItem('selectedLanguage') ?? 'hr';

    this.form.setValue({
      language: saved as
        | 'hr'
        | 'en-US'
        | 'de'
        | 'it'
        | 'fr'
        | 'es'
        | 'cs'
        | null,
    });

    this.setLanguage(saved);
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
    window.localStorage.setItem('selectedLanguage', code);
    this.currentLanguageService.setLanguage(code);
  }
}
