import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { CurrentLanguageService } from '../../services/current-language.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

/**
 * Component for leaving a review.
 */
@Component({
  selector: 'app-leave-review',
  imports: [
    CommonModule,
    FormsModule,
    LanguageSwitcherComponent,
    TranslatePipe,
  ],
  standalone: true,
  templateUrl: './leave-review.component.html',
  styleUrl: './leave-review.component.scss',
})
export class LeaveReviewComponent {
  selectedRating = 0;
  hoveredRating = 0;
  reviewerName = '';
  reviewText = '';
  constructor(public currentLanguageService: CurrentLanguageService) {}
}
