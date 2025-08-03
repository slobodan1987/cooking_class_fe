import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookingFormComponent } from '../booking-form/booking-form.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { InfoSectionComponent } from '../info-section/info-section.component';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import {
  companyDataMock,
  completelyBookedDaysMock,
  manuallyExcludedDaysMock,
  reservationsMock,
  reviewsMockExtensive,
} from '../models/mock';
import { ICompanyData, IReservation, IReview } from '../models/model';
import { TranslatePipe } from '../pipes/translate.pipe';
import { ReviewListComponent } from '../review-list/review-list.component';
import { CurrentLanguageService } from '../services/current-language.service';

/** * HomeComponent serves as the main entry point for the home page of the application.
 * It initializes the booking engine state and includes various components such as the carousel, language switcher, review list, and booking form.
 * The component is designed to be standalone and can be used independently in different parts of the application.
 */
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    CommonModule,
    CarouselComponent,
    LanguageSwitcherComponent,
    ReviewListComponent,
    BookingFormComponent,
    InfoSectionComponent,
    TranslatePipe,
  ],
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  companyData: ICompanyData | null = null;
  reservations: IReservation[] = [];
  manuallyExcludedDays: string[] = [];
  completelyBookedDays: string[] = [];
  reviews: IReview[] = [];

  constructor(public currentLanguageService: CurrentLanguageService) {}

  ngOnInit(): void {
    this.companyData = companyDataMock;
    this.reservations = reservationsMock;
    this.manuallyExcludedDays = manuallyExcludedDaysMock;
    this.completelyBookedDays = completelyBookedDaysMock;
    this.reviews = reviewsMockExtensive;
    // this.reviews = [];
  }
}
