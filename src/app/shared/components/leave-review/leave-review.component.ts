import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { CurrentLanguageService } from '../../services/current-language.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { BehaviorSubject } from 'rxjs';

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
  idChecked$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(public currentLanguageService: CurrentLanguageService) {}
  /**
   * Warn user before leaving the page to prevent accidental loss of work
   */
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: BeforeUnloadEvent): void {
    $event.preventDefault();
  }
}
