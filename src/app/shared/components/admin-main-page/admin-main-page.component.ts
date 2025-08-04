import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import flatpickr from 'flatpickr';
import { Croatian } from 'flatpickr/dist/l10n/hr.js';
import { Subscription } from 'rxjs';
import { sortReservations } from '../../functions/helper-functions';
import { ICompanyData, IReservation, IReview } from '../../models/model';
import { CurrentLanguageService } from '../../services/current-language.service';
import { ReservationCardComponent } from '../reservation-card/reservation-card.component';
import { ReviewCardComponent } from '../review-card/review-card.component';

/**
 * AdminMainPageComponent is the main component for the admin page.
 * It handles the display and management of reservations, reviews, company data,
 * and manually excluded days.
 * It also provides functionality for editing fields and managing unavailable dates.
 * The component uses Flatpickr for date selection and supports dynamic updates
 * to the date picker based on user interactions.
 */
@Component({
  selector:
    'app-admin-main-page[reservations][reviews][companyData][manuallyExcludedDays]',
  imports: [
    CommonModule,
    FormsModule,
    ReservationCardComponent,
    ReviewCardComponent,
  ],
  templateUrl: './admin-main-page.component.html',
  styleUrl: './admin-main-page.component.scss',
  standalone: true,
})
export class AdminMainPageComponent implements OnDestroy, AfterViewInit {
  @ViewChild('newManuallyExcludedDay', { static: true })
  dateInput!: ElementRef<HTMLInputElement>;

  private _reservations: IReservation[] = [];
  private _reviews: IReview[] = [];
  private _companyData: ICompanyData | null = null;
  private _manuallyExcludedDays: string[] = [];

  @Input()
  set reservations(value: IReservation[]) {
    this._reservations = value;
  }
  get reservations(): IReservation[] {
    return this._reservations;
  }

  @Input()
  set reviews(value: IReview[]) {
    this._reviews = value;
  }
  get reviews(): IReview[] {
    return this._reviews;
  }

  @Input()
  set companyData(value: ICompanyData | null) {
    this._companyData = value;
  }
  get companyData(): ICompanyData | null {
    return this._companyData;
  }

  @Input()
  set manuallyExcludedDays(value: string[]) {
    this._manuallyExcludedDays = value;
    this.updateFlatpickrDisabledDates();
  }
  get manuallyExcludedDays(): string[] {
    return this._manuallyExcludedDays;
  }

  isPopupOpen = false;
  isPopupOpenContactingTechnicalAdministrator = false;
  editingField = '';
  editingValue = '';
  editingFieldByContactingTechnicalAdministrator = '';
  subscriptions: Subscription[] = [];
  loading = false; // New loading state for async operations
  /**
   * Array of additional disabled days in the format DD.MM.YYYY.
   * These days can be used for special cases or additional exclusions.
   * They will also be disabled in the Flatpickr date picker.
   * This is a new feature added to enhance the booking system's flexibility.
   */
  additionalDisabledDays: string[] = [];
  private flatpickrInstance: any;

  constructor(public currentLanguageService: CurrentLanguageService) {}

  /**
   * Warn user before leaving the page to prevent accidental loss of work
   */
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: BeforeUnloadEvent): void {
    $event.preventDefault();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    if (this.flatpickrInstance) {
      this.flatpickrInstance.destroy();
    }
  }

  ngAfterViewInit(): void {
    this.initializeFlatpickr();
  }

  // /**
  //  * Logout functionality - clear authentication
  //  */
  // logout(): void {
  //   // Clear authentication token (secure - no password stored)
  //   sessionStorage.removeItem('admin_auth_token');
  //   // Redirect to auth page
  //   this.router.navigate(['/auth']);
  // }

  /**
   * Get the currently disabled dates for the Flatpickr date picker.
   * @returns An array of dates that are currently disabled in the Flatpickr date picker.
   * This includes manually excluded days, additional disabled days, weekends, and past dates.
   * The dates are formatted as YYYY-MM-DD for compatibility with Flatpickr.
   */
  private getCurrentDisabledDates(): any[] {
    // Convert unavailable days from DD.MM.YYYY. format to YYYY-MM-DD for Flatpickr
    const disabledDates = this.manuallyExcludedDays
      .map((date) => {
        const dateParts = date.replace(/\.$/, '').split('.');
        if (dateParts.length === 3) {
          const day = dateParts[0].padStart(2, '0');
          const month = dateParts[1].padStart(2, '0');
          const year = dateParts[2];
          return `${year}-${month}-${day}`;
        }
        return null; // Invalid date format
      })
      .filter((date) => date !== null); // Remove invalid dates

    // Convert additional disabled days for Flatpickr
    const additionalDisabledDates = this.additionalDisabledDays
      .map((date) => {
        const dateParts = date.replace(/\.$/, '').split('.');
        if (dateParts.length === 3) {
          const day = dateParts[0].padStart(2, '0');
          const month = dateParts[1].padStart(2, '0');
          const year = dateParts[2];
          return `${year}-${month}-${day}`;
        }
        return null; // Invalid date format
      })
      .filter((date) => date !== null); // Remove invalid dates

    return [
      ...disabledDates,
      ...additionalDisabledDates,
      // Disable all weekends (Saturday = 6, Sunday = 0)
      function (date: Date) {
        return date.getDay() === 0 || date.getDay() === 6;
      },
      // Disable today and all past dates
      function (date: Date) {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate comparison
        return date <= today;
      },
    ];
  }

  /**
   * Initialize the Flatpickr date picker with the current disabled dates.
   * This method sets up the date picker with the necessary configurations,
   * including disabling weekends, past dates, and manually excluded days.
   * It also applies the Croatian locale for date formatting.
   */
  private initializeFlatpickr(): void {
    if (this.dateInput && this.dateInput.nativeElement) {
      // Destroy existing instance if it exists
      if (this.flatpickrInstance) {
        this.flatpickrInstance.destroy();
      }

      // Use Croatian as the default locale for admin page
      const locale = Croatian;
      const disabledDates = this.getCurrentDisabledDates();

      this.flatpickrInstance = flatpickr(this.dateInput.nativeElement, {
        disable: disabledDates,
        allowInput: false,
        disableMobile: true,
        dateFormat: 'd.m.Y',
        locale: locale,
        onChange: (selectedDates, dateStr) => {
          // Handle date selection if needed
        },
      });

      console.log('Flatpickr initialized with Croatian locale');
    } else {
      console.log(
        'Flatpickr initialization skipped - element not available or not authenticated'
      );
    }
  }

  /**
   * Update the Flatpickr date picker with the current manually excluded days.
   * This method converts the manually excluded days to the format required by Flatpickr
   * and updates the disabled dates in the date picker.
   * It also handles additional disabled days if they are set.
   * This is useful for dynamically managing unavailable dates in the booking system.
   */
  private updateFlatpickrDisabledDates(): void {
    if (this.flatpickrInstance) {
      // Convert unavailable days for Flatpickr (from DD.MM.YYYY. to YYYY-MM-DD)
      const disabledDates = this.manuallyExcludedDays
        .map((date) => {
          // Handle DD.MM.YYYY. format - remove trailing dot and split by dots
          const dateParts = date.replace(/\.$/, '').split('.');
          if (dateParts.length === 3) {
            const day = dateParts[0].padStart(2, '0');
            const month = dateParts[1].padStart(2, '0');
            const year = dateParts[2];
            return `${year}-${month}-${day}`;
          }
          return null; // Invalid date format
        })
        .filter((date) => date !== null); // Remove invalid dates

      // Convert additional disabled days for Flatpickr
      const additionalDisabledDates = this.additionalDisabledDays
        .map((date) => {
          const dateParts = date.replace(/\.$/, '').split('.');
          if (dateParts.length === 3) {
            const day = dateParts[0].padStart(2, '0');
            const month = dateParts[1].padStart(2, '0');
            const year = dateParts[2];
            return `${year}-${month}-${day}`;
          }
          return null; // Invalid date format
        })
        .filter((date) => date !== null); // Remove invalid dates

      // Combine all disabled dates
      const allDisabledDates = [...disabledDates, ...additionalDisabledDates];

      // Destroy and recreate the Flatpickr instance to ensure proper update
      this.flatpickrInstance.destroy();

      this.flatpickrInstance = flatpickr(this.dateInput.nativeElement, {
        disable: [
          ...allDisabledDates,
          // Disable all weekends (Saturday = 6, Sunday = 0)
          function (date: Date) {
            return date.getDay() === 0 || date.getDay() === 6;
          },
          // Disable today and all past dates
          function (date: Date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate comparison
            return date <= today;
          },
        ],
        allowInput: false,
        disableMobile: true,
        dateFormat: 'd.m.Y',
        locale: Croatian,
        onChange: (selectedDates, dateStr) => {
          // Handle date selection if needed
        },
      });

      console.log('Flatpickr recreated with disabled dates:', allDisabledDates);
      console.log('Current manually excluded days:', this.manuallyExcludedDays);
    }
  }

  editField(fieldName: string, currentValue: string) {
    this.editingField = fieldName;
    this.editingValue = currentValue;
    this.isPopupOpen = true;
  }

  editFieldByContactingTechnicalAdministrator(fieldName: string) {
    this.editingFieldByContactingTechnicalAdministrator = fieldName;
    this.isPopupOpenContactingTechnicalAdministrator = true;
  }

  closePopup() {
    this.isPopupOpen = false;
    this.editingField = '';
    this.editingValue = '';
  }

  closePopupContactingTechnicalAdministrator() {
    this.isPopupOpenContactingTechnicalAdministrator = false;
    this.editingFieldByContactingTechnicalAdministrator = '';
  }

  saveField(newValue: string) {
    // Here you would implement the save logic
    console.log(`Saving ${this.editingField} with value: ${newValue}`);
    this.closePopup();
  }

  /**
   * Remove a date from the manually excluded days list.
   * This method updates the manually excluded days and the Flatpickr disabled dates.
   * It ensures that the specified date is removed from the list and the date picker is updated accordingly.
   * This is useful for managing unavailable dates in the booking system.
   * It allows the admin to dynamically adjust the booking availability by removing dates that are no longer excluded.
   * This method is called when the user clicks the remove button for a specific date in the admin interface.
   * It also updates the Flatpickr instance to reflect the changes in the disabled dates.
   * This is a key feature for maintaining flexibility in the booking system.
   * @param day - The date to be removed from the manually excluded days list.
   */
  removeManuallyExcludedDay(day: string) {
    const index = this.manuallyExcludedDays.indexOf(day);
    if (index > -1) {
      this.manuallyExcludedDays.splice(index, 1);
      this.updateFlatpickrDisabledDates();
    }
  }

  /**
   * Add a date to the manually excluded days list.
   * This method updates the manually excluded days and the Flatpickr disabled dates.
   * It ensures that the specified date is added to the list and the date picker is updated accordingly.
   * This is useful for managing unavailable dates in the booking system.
   * It allows the admin to dynamically adjust the booking availability by adding new dates that should be excluded.
   * This method is called when the user submits a new date in the admin interface.
   * It also updates the Flatpickr instance to reflect the changes in the disabled dates.
   * This is a key feature for maintaining flexibility in the booking system.
   * @param dateValue - The date to be added to the manually excluded days list.
   */
  addManuallyExcludedDay(dateValue: string) {
    if (dateValue) {
      // Ensure the date has the correct format (DD.MM.YYYY.)
      const normalizedDate = dateValue.endsWith('.')
        ? dateValue
        : dateValue + '.';

      // Check if date is not already in the list
      if (!this.manuallyExcludedDays.includes(normalizedDate)) {
        this.manuallyExcludedDays.push(normalizedDate);

        // Immediately update the Flatpickr disabled dates to include this new date
        this.updateFlatpickrDisabledDates();

        // Clear the input field after adding
        if (this.flatpickrInstance) {
          this.flatpickrInstance.clear();
        }

        console.log(
          `Date ${normalizedDate} added to manually excluded days and disabled in picker`
        );
      } else {
        console.log(
          `Date ${normalizedDate} is already in manually excluded days list`
        );
      }
    }
  }

  /**
   * Scrolls to a specific section on the page with smooth animation.
   * @param sectionId - The ID of the section to scroll to
   */
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }

  sortReservations(): void {
    this.reservations = [...sortReservations(this.reservations)];
  }
}
