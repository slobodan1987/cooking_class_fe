import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { sortReservations } from '../../functions/helper-functions';
import {
  companyDataMock,
  manuallyExcludedDaysMock,
  reservationsMock,
  reviewsMockExtensive,
} from '../../models/mock';
import { ICompanyData, IReservation, IReview } from '../../models/model';
import { AdminAuthService } from '../../services/admin-auth.service';
import { AdminAuthPageComponent } from '../admin-auth-page/admin-auth-page.component';
import { AdminMainPageComponent } from '../admin-main-page/admin-main-page.component';

@Component({
  selector: 'app-admin-page',
  imports: [AdminAuthPageComponent, AdminMainPageComponent, CommonModule],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
})
export class AdminPageComponent implements OnInit {
  companyData: ICompanyData | null = null;
  reservations: IReservation[] = [];
  reviews: IReview[] = []; // New array for reviews
  manuallyExcludedDays: string[] = []; // New array for manually excluded days

  constructor(public adminAuthService: AdminAuthService) {}

  readCompanyData() {
    this.companyData = companyDataMock;
  }
  readReservations() {
    this.reservations = reservationsMock;
    this.reservations = [...sortReservations(this.reservations)];
  }
  readReviews() {
    const reviews = reviewsMockExtensive;
    // this.reviews = [];
    this.reviews = reviews.filter(
      (review) => review.status === 'WAITING_FOR_PUBLICATION'
    );
  }
  readManuallyExcludedDays() {
    this.manuallyExcludedDays = manuallyExcludedDaysMock;
  }
  ngOnInit(): void {
    this.readCompanyData();
    this.readReservations();
    this.readReviews();
    this.readManuallyExcludedDays();
  }
}
