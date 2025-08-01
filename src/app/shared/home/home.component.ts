import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookingFormComponent } from '../booking-form/booking-form.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { InfoSectionComponent } from '../info-section/info-section.component';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { mockEmptyBeState } from '../models/mock';
import { IBEState } from '../models/model';
import { ReviewListComponent } from '../review-list/review-list.component';
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
  ],
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  beState: IBEState | null = null;

  ngOnInit(): void {
    this.readBEState();
  }

  readBEState() {
    this.beState = mockEmptyBeState;
  }
}
