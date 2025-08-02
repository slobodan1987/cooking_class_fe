import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
// Update the path below if 'model' is located elsewhere, e.g.:
import { IBEState } from '../models/model';
// Or, if the file does not exist, create 'model.ts' in the correct directory with the IBEState definition.
import { CommonModule } from '@angular/common';
import flatpickr from 'flatpickr';
import { Croatian } from 'flatpickr/dist/l10n/hr.js';
import { German } from 'flatpickr/dist/l10n/de.js';
import { French } from 'flatpickr/dist/l10n/fr.js';
import { Spanish } from 'flatpickr/dist/l10n/es.js';
import { Italian } from 'flatpickr/dist/l10n/it.js';
import { Czech } from 'flatpickr/dist/l10n/cs.js';
import { CurrentLanguageService } from '../services/current-language.service';
import { TranslatePipe } from '../pipes/translate.pipe';

interface BookingForm {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
  date: FormControl<string | null>;
  guests: FormControl<number | null>;
  message?: FormControl<string | null>;
}

interface Form {
  bookingForm: FormGroup<BookingForm>;
}

/** * BookingFormComponent is a form component that allows users to book a cooking class.
 * It includes fields for name, email, phone, date, number of guests, and an optional message.
 * The component validates the input fields and uses flatpickr for date selection.
 * It is designed to be standalone and can be used independently in different parts of the application.
 */
@Component({
  selector: 'app-booking-form[beState]',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TranslatePipe],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.scss',
})
export class BookingFormComponent implements AfterViewInit {
  @ViewChild('dateInput', { static: true })
  dateInput!: ElementRef<HTMLInputElement>;
  private _beState: IBEState | null = null;
  private flatpickrInstance: any;

  @Input()
  set beState(value: IBEState | null) {
    this._beState = value;
    this.setup();
  }
  get beState(): IBEState | null {
    return this._beState;
  }

  allowedDates: string[] = [];

  todayDate: Date | null = null;
  pricePerPerson: number | null = null;

  startTime: string | null = null;
  endTime: string | null = null;

  address: string | null = null;
  companyPhone: string | null = null;
  companyMail: string | null = null;

  minPersonsPerClass: number | null = null;
  maxPersonsPerClass: number | null = null;

  form: FormGroup<Form> = this.createForm();

  constructor(
    public currentLanguageService: CurrentLanguageService // Assuming this service is used to get the current language
  ) {}

  phoneValidator(): ValidatorFn {
    return (control: AbstractControl<any, any>): ValidationErrors | null => {
      const phoneStr = control.value as string;

      // Simple phone number validation (can be adjusted based on requirements)
      const phoneRegex = /^\+?[0-9\s-]{7,}$/; // At least 7 digits, can include +, spaces, and dashes
      const isValidPhone = phoneRegex.test(phoneStr);
      if (!isValidPhone) {
        return { phoneInvalid: true };
      }
      return null;
    };
  }

  eMailValidator(): ValidatorFn {
    return (control: AbstractControl<any, any>): ValidationErrors | null => {
      const emailStr = control.value as string;

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isValidEmail = emailRegex.test(emailStr);
      if (!isValidEmail) {
        return { emailInvalid: true };
      }
      return null;
    };
  }

  createForm(): FormGroup<Form> {
    return new FormGroup<Form>({
      bookingForm: new FormGroup<BookingForm>({
        name: new FormControl<string | null>({ value: null, disabled: false }, [
          Validators.required,
        ]),
        email: new FormControl<string | null>(
          { value: null, disabled: false },
          [Validators.required, this.eMailValidator()]
        ),
        phone: new FormControl<string | null>(
          { value: null, disabled: false },
          [Validators.required, this.phoneValidator()]
        ),
        date: new FormControl<string | null>(
          {
            value: null,
            disabled: false,
          },
          [Validators.required]
        ),
        // guests: new FormControl<number | null>({ value: 2, disabled: true }, [
        guests: new FormControl<number | null>(
          { value: null, disabled: false },
          [
            Validators.min(this.minPersonsPerClass ?? 2),
            Validators.max(this.maxPersonsPerClass ?? 12),
            Validators.required,
          ]
        ),
        message: new FormControl<string | null>(
          {
            value: null,
            disabled: false,
          },
          []
        ),
      }),
    });
  }

  ngAfterViewInit() {
    this.initializeFlatpickr();

    // Subscribe to language changes and update Flatpickr locale
    this.currentLanguageService.currentLanguage$.subscribe((language) => {
      if (this.flatpickrInstance && language) {
        this.updateFlatpickrLocale(language);
      }
    });
  }

  private getFlatpickrLocale(language: string): any {
    switch (language) {
      case 'hr':
        return Croatian;
      case 'de':
        return German;
      case 'fr':
        return French;
      case 'es':
        return Spanish;
      case 'it':
        return Italian;
      case 'cs':
        return Czech;
      case 'en-US':
      default:
        return 'default'; // English is the default
    }
  }

  private initializeFlatpickr(): void {
    if (this.dateInput) {
      const currentLanguage =
        this.currentLanguageService.currentLanguage$.getValue();
      const locale = this.getFlatpickrLocale(currentLanguage || 'en-US');

      this.flatpickrInstance = flatpickr(this.dateInput.nativeElement, {
        enable: this.allowedDates,
        allowInput: false,
        disableMobile: true,
        locale: locale,
        dateFormat: 'd.m.Y',
      });
    }
  }

  private updateFlatpickrLocale(language: string): void {
    if (this.flatpickrInstance) {
      const locale = this.getFlatpickrLocale(language);

      // Destroy and recreate with new locale
      this.flatpickrInstance.destroy();

      this.flatpickrInstance = flatpickr(this.dateInput.nativeElement, {
        enable: this.allowedDates,
        allowInput: false,
        disableMobile: true,
        locale: locale,
        dateFormat: 'd.m.Y',
      });
    }
  }

  setup() {
    this.todayDate = new Date();
    this.pricePerPerson = this.beState?.companyData?.pricePerPerson ?? null;

    this.startTime = this.beState?.companyData?.startTime ?? null;
    this.endTime = this.beState?.companyData?.endTime ?? null;

    this.address = this.beState?.companyData?.address ?? null;
    this.companyPhone = this.beState?.companyData?.phone ?? null;
    this.companyMail = this.beState?.companyData?.email ?? null;

    this.minPersonsPerClass =
      this.beState?.companyData?.minPersonsPerClass ?? null;
    this.maxPersonsPerClass =
      this.beState?.companyData?.maxPersonsPerClass ?? null;

    this.allowedDates = this.beState?.dates?.map((date) => date?.date) ?? [];

    this.form = this.createForm();
  }
}
