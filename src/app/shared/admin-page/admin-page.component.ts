import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import flatpickr from 'flatpickr';
import { Croatian } from 'flatpickr/dist/l10n/hr.js';
import {
  companyDataMock,
  manuallyExcludedDaysMock,
  reservationsMock,
  reviewsMockShort,
} from '../models/mock';
import { ICompanyData, IReservation, IReview } from '../models/model';
import { ReservationCardComponent } from '../reservation-card/reservation-card.component';
import { CurrentLanguageService } from '../services/current-language.service';

/** * AdminPageComponent serves as the main entry point for the admin page of the application.
 * It initializes the booking engine state with predefined dates and company data.
 * The component is designed to be standalone and can be used independently in different parts of the application.
 */
@Component({
  selector:
    'app-admin-page[reservations][reviews][companyData][manuallyExcludedDays]',
  imports: [CommonModule, FormsModule, ReservationCardComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
  standalone: true,
})
export class AdminPageComponent implements OnInit, AfterViewInit {
  @ViewChild('newManuallyExcludedDay', { static: true })
  dateInput!: ElementRef<HTMLInputElement>;

  isPopupOpen = false;
  isPopupOpenContactingTechnicalAdministrator = false;
  editingField = '';
  editingValue = '';
  editingFieldByContactingTechnicalAdministrator = '';
  /**
   * Array of manually excluded days in the format DD.MM.YYYY.
   * These days will be disabled in the Flatpickr date picker.
   */
  // unavailableDays: string[] = []; --- IGNORE ---
  /**
   * Array of manually excluded days in the format DD.MM.YYYY.
   * These days will be disabled in the Flatpickr date picker.
   */
  manuallyExcludedDays: string[] = [];
  /**
   * Array of additional disabled days in the format DD.MM.YYYY.
   * These days can be used for special cases or additional exclusions.
   * They will also be disabled in the Flatpickr date picker.
   * This is a new feature added to enhance the booking system's flexibility.
   */
  additionalDisabledDays: string[] = [];
  private flatpickrInstance: any;
  reservations: IReservation[] = []; // New array for reservations
  reviews: IReview[] = []; // New array for reviews
  companyData: ICompanyData | null = null; // Placeholder for company data

  constructor(public currentLanguageService: CurrentLanguageService) {}

  ngOnInit(): void {
    this.readCompanyData();
    this.readReservations();
    this.readReviews();
    this.readManuallyExcludedDays();
  }

  ngAfterViewInit(): void {
    this.initializeFlatpickr();
  }

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
    if (this.dateInput) {
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

  readCompanyData() {
    this.companyData = companyDataMock;
  }

  readReservations() {
    this.reservations = reservationsMock;
    this.sortReservations();
  }

  sortReservations() {
    this.reservations.sort((a, b) => {
      // Define status priority: WAITING_FOR_CONFIRMATION (1), CONFIRMED (2), CANCELED (3)
      const getStatusPriority = (status: string): number => {
        switch (status) {
          case 'WAITING_FOR_CONFIRMATION':
            return 1; // Yellow - highest priority
          case 'CONFIRMED':
            return 2; // Green - medium priority
          case 'CANCELED':
            return 3; // Red - lowest priority
          default:
            return 4; // Unknown status - lowest priority
        }
      };

      const statusPriorityA = getStatusPriority(a.status);
      const statusPriorityB = getStatusPriority(b.status);

      // First, sort by status priority
      if (statusPriorityA !== statusPriorityB) {
        return statusPriorityA - statusPriorityB;
      }

      // If status is the same, sort by date (oldest first)
      // Convert DD.MM.YYYY. format to Date object for comparison
      const parseDate = (dateStr: string): Date => {
        const dateParts = dateStr.replace(/\.$/, '').split('.');
        if (dateParts.length === 3) {
          const day = parseInt(dateParts[0], 10);
          const month = parseInt(dateParts[1], 10) - 1; // Month is 0-indexed in Date
          const year = parseInt(dateParts[2], 10);
          return new Date(year, month, day);
        }
        return new Date(0); // Invalid date fallback
      };

      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);

      return dateA.getTime() - dateB.getTime(); // Oldest first
    });
  }

  readReviews() {
    this.reviews = reviewsMockShort;
  }

  readManuallyExcludedDays() {
    this.manuallyExcludedDays = manuallyExcludedDaysMock;
    this.updateFlatpickrDisabledDates();
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
}
