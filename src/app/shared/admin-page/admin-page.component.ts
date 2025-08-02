import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { mockBeStateWithDates } from '../models/mock';
import { IBEState } from '../models/model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import flatpickr from 'flatpickr';
import { Croatian } from 'flatpickr/dist/l10n/hr.js';
import { German } from 'flatpickr/dist/l10n/de.js';
import { French } from 'flatpickr/dist/l10n/fr.js';
import { Spanish } from 'flatpickr/dist/l10n/es.js';
import { Italian } from 'flatpickr/dist/l10n/it.js';
import { Czech } from 'flatpickr/dist/l10n/cs.js';
import { CurrentLanguageService } from '../services/current-language.service';

/** * AdminPageComponent serves as the main entry point for the admin page of the application.
 * It initializes the booking engine state with predefined dates and company data.
 * The component is designed to be standalone and can be used independently in different parts of the application.
 */
@Component({
  selector: 'app-admin-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
  standalone: true,
})
export class AdminPageComponent implements OnInit, AfterViewInit {
  @ViewChild('newUnavailableDay', { static: true })
  dateInput!: ElementRef<HTMLInputElement>;

  beState: IBEState | null = null;
  isPopupOpen = false;
  editingField = '';
  editingValue = '';
  unavailableDays: string[] = [];
  additionalDisabledDays: string[] = []; // New array for additional disabled days
  private flatpickrInstance: any;

  constructor(public currentLanguageService: CurrentLanguageService) {}

  ngOnInit(): void {
    this.readBEState();
  }

  ngAfterViewInit(): void {
    this.initializeFlatpickr();
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

  private updateFlatpickrLocale(language: string): void {
    if (this.flatpickrInstance) {
      // Store current disabled dates before destroying
      const currentDisabledDates = this.getCurrentDisabledDates();

      // Destroy and recreate with Croatian locale (admin page always uses Croatian)
      this.flatpickrInstance.destroy();

      const locale = Croatian;

      this.flatpickrInstance = flatpickr(this.dateInput.nativeElement, {
        disable: currentDisabledDates,
        allowInput: false,
        disableMobile: true,
        dateFormat: 'd.m.Y',
        locale: locale,
        onChange: (selectedDates, dateStr) => {
          // Handle date selection if needed
        },
      });
    }
  }
  private getCurrentDisabledDates(): any[] {
    // Convert unavailable days from DD.MM.YYYY. format to YYYY-MM-DD for Flatpickr
    const disabledDates = this.unavailableDays
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

  private updateFlatpickrDisabledDates(): void {
    if (this.flatpickrInstance) {
      // Convert unavailable days for Flatpickr (from DD.MM.YYYY. to YYYY-MM-DD)
      const disabledDates = this.unavailableDays
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
      console.log('Current unavailable days:', this.unavailableDays);
    }
  }

  readBEState() {
    this.beState = mockBeStateWithDates;
  }

  editField(fieldName: string, currentValue: string) {
    this.editingField = fieldName;
    this.editingValue = currentValue;
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
    this.editingField = '';
    this.editingValue = '';
  }

  saveField(newValue: string) {
    // Here you would implement the save logic
    console.log(`Saving ${this.editingField} with value: ${newValue}`);
    this.closePopup();
  }

  removeUnavailableDay(day: string) {
    const index = this.unavailableDays.indexOf(day);
    if (index > -1) {
      this.unavailableDays.splice(index, 1);
      this.updateFlatpickrDisabledDates();
    }
  }

  addUnavailableDay(dateValue: string) {
    if (dateValue) {
      // Ensure the date has the correct format (DD.MM.YYYY.)
      const normalizedDate = dateValue.endsWith('.')
        ? dateValue
        : dateValue + '.';

      // Check if date is not already in the list
      if (!this.unavailableDays.includes(normalizedDate)) {
        this.unavailableDays.push(normalizedDate);

        // Immediately update the Flatpickr disabled dates to include this new date
        this.updateFlatpickrDisabledDates();

        // Clear the input field after adding
        if (this.flatpickrInstance) {
          this.flatpickrInstance.clear();
        }

        console.log(
          `Date ${normalizedDate} added to unavailable days and disabled in picker`
        );
      } else {
        console.log(
          `Date ${normalizedDate} is already in unavailable days list`
        );
      }
    }
  }

  /**
   * Adds additional disabled days to the datepicker
   * @param days Array of dates in DD.MM.YYYY. format to disable
   */
  addAdditionalDisabledDays(days: string[]): void {
    // Validate date format and filter out invalid dates
    const validDates = days.filter((date) => {
      const datePattern = /^\d{1,2}\.\d{1,2}\.\d{4}\.?$/;
      return datePattern.test(date);
    });

    // Add only new dates that aren't already disabled
    validDates.forEach((date) => {
      const normalizedDate = date.endsWith('.') ? date : date + '.';
      if (!this.additionalDisabledDays.includes(normalizedDate)) {
        this.additionalDisabledDays.push(normalizedDate);
      }
    });

    // Update the datepicker
    this.updateFlatpickrDisabledDates();
  }

  /**
   * Removes specific dates from additional disabled days
   * @param days Array of dates in DD.MM.YYYY. format to remove from disabled list
   */
  removeAdditionalDisabledDays(days: string[]): void {
    days.forEach((date) => {
      const normalizedDate = date.endsWith('.') ? date : date + '.';
      const index = this.additionalDisabledDays.indexOf(normalizedDate);
      if (index > -1) {
        this.additionalDisabledDays.splice(index, 1);
      }
    });

    // Update the datepicker
    this.updateFlatpickrDisabledDates();
  }

  /**
   * Clears all additional disabled days
   */
  clearAdditionalDisabledDays(): void {
    this.additionalDisabledDays = [];
    this.updateFlatpickrDisabledDates();
  }

  /**
   * Gets the current list of additional disabled days
   * @returns Array of dates in DD.MM.YYYY. format
   */
  getAdditionalDisabledDays(): string[] {
    return [...this.additionalDisabledDays];
  }
}
