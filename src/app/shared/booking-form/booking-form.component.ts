import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
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
// Or, if the file does not exist, create 'model.ts' in the correct directory with the IBEState definition.
import { CommonModule } from '@angular/common';
import flatpickr from 'flatpickr';
import { Czech } from 'flatpickr/dist/l10n/cs.js';
import { German } from 'flatpickr/dist/l10n/de.js';
import { Spanish } from 'flatpickr/dist/l10n/es.js';
import { French } from 'flatpickr/dist/l10n/fr.js';
import { Croatian } from 'flatpickr/dist/l10n/hr.js';
import { Italian } from 'flatpickr/dist/l10n/it.js';
import {
  BehaviorSubject,
  combineLatest,
  Subscription,
  tap,
  withLatestFrom,
} from 'rxjs';
import { ICompanyData, IReservation } from '../models/model';
import { TranslatePipe } from '../pipes/translate.pipe';
import { CurrentLanguageService } from '../services/current-language.service';

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
  selector: 'app-booking-form[companyData][manuallyExcludedDays][reservations]',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TranslatePipe],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.scss',
})
export class BookingFormComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('dateInput', { static: true })
  dateInput!: ElementRef<HTMLInputElement>;
  private flatpickrInstance: any;
  companyData$ = new BehaviorSubject<ICompanyData | null>(null);
  manuallyExcludedDays$ = new BehaviorSubject<string[]>([]);
  disabledDaysInDatepicker$ = new BehaviorSubject<string[]>([]); // This will be used to combine manually excluded days and booked reservations
  reservations$ = new BehaviorSubject<IReservation[]>([]);
  subscriptions: Subscription[] = [];
  /**
   * Sets the company data and initializes the form.
   * @param value - The company data containing address, phone, email, start and end time, min and max persons per class, price per person, and max days in future.
   * This setter method is used to update the component's state when the company data changes.
   * It also sets up the initial values for the form and other properties based on the provided company data.
   * It is called when the component is initialized or when the company data is updated.
   */
  @Input()
  set companyData(value: ICompanyData | null) {
    this._companyData = value;
    this.companyData$.next(value);
  }
  get companyData(): ICompanyData | null {
    return this._companyData;
  }
  private _companyData: ICompanyData | null = null;

  /**
   * Sets the manually excluded days for the booking form.
   * @param value - An array of dates that are manually excluded for booking.
   */
  @Input()
  set manuallyExcludedDays(value: string[]) {
    this._manuallyExcludedDays = value;
    this.manuallyExcludedDays$.next(value);
  }
  get manuallyExcludedDays(): string[] {
    return this._manuallyExcludedDays;
  }
  private _manuallyExcludedDays: string[] = [];

  /**
   * Sets the reservations for the booking form.
   * @param value - An array of reservations that have been made.
   * This setter method is used to update the component's state when the reservations change.
   * It allows the component to manage and display the current reservations.
   * Only reservations with status 'WAITING_FOR_CONFIRMATION' and 'CONFIRMED' are taken into account here.
   * It is called when the component is initialized or when the reservations are updated.
   */
  @Input()
  set reservations(value: IReservation[]) {
    this.reservations$.next(value);
    this._reservations = value;
  }
  get reservations(): IReservation[] {
    return this._reservations;
  }
  private _reservations: IReservation[] = [];

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

  ngOnInit(): void {
    this.subscriptions.push(
      combineLatest([
        this.companyData$,
        this.manuallyExcludedDays$,
        this.reservations$,
      ])
        .pipe(
          tap(([_, manuallyExcludedDays$, reservations]) => {
            // Combine manually excluded days and booked reservations to disable them in the date picker
            this.disabledDaysInDatepicker$.next([
              ...manuallyExcludedDays$,
              ...reservations
                .filter(
                  (reservation) =>
                    reservation.status === 'WAITING_FOR_CONFIRMATION' ||
                    reservation.status === 'CONFIRMED'
                )
                .map((reservation) => reservation.date),
            ]);
          })
        )
        .subscribe()
    );
  }

  ngAfterViewInit() {
    this.subscriptions.push(
      combineLatest([
        this.companyData$,
        this.manuallyExcludedDays$,
        this.reservations$,
        this.currentLanguageService.currentLanguage$,
      ])
        .pipe(
          tap(([_, manuallyExcludedDays$, reservations]) => {
            // Combine manually excluded days and booked reservations to disable them in the date picker
            this.disabledDaysInDatepicker$.next([
              ...manuallyExcludedDays$,
              ...reservations
                .filter(
                  (reservation) =>
                    reservation.status === 'WAITING_FOR_CONFIRMATION' ||
                    reservation.status === 'CONFIRMED'
                )
                .map((reservation) => reservation.date),
            ]);
          }),
          tap(() => this.initializeFlatpickr()),
          tap((res) => {
            const language = res[3];
            if (this.flatpickrInstance && language) {
              this.updateFlatpickrLocale(language);
            } // Update the locale of flatpickr based on the current languageCode
          }),
          tap(() => {
            this.setup();
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    if (this.flatpickrInstance) {
      this.flatpickrInstance.destroy();
    }
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
        disable: this.disabledDaysInDatepicker$.getValue(),
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
        disable: this.disabledDaysInDatepicker$.getValue(),
        allowInput: false,
        disableMobile: true,
        locale: locale,
        dateFormat: 'd.m.Y',
      });
    }
  }

  setup() {
    this.todayDate = new Date();
    this.pricePerPerson = this.companyData?.pricePerPerson ?? null;

    this.startTime = this.companyData?.startTime ?? null;
    this.endTime = this.companyData?.endTime ?? null;

    this.address = this.companyData?.address ?? null;
    this.companyPhone = this.companyData?.phone ?? null;
    this.companyMail = this.companyData?.email ?? null;

    this.minPersonsPerClass = this.companyData?.minPersonsPerClass ?? null;
    this.maxPersonsPerClass = this.companyData?.maxPersonsPerClass ?? null;

    this.form = this.createForm();
  }
}
