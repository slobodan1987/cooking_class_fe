import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IReview } from '../../models/model';

import { CommonModule } from '@angular/common';
import { ReviewStatusPipe } from '../../pipes/review-status.pipe';

/**
 * ReviewCardComponent displays a review card with details such as author, comment, and status.
 * It allows users to change the status of the review (publish or reject).
 * The component emits an event when the status is changed.
 */
@Component({
  selector: 'app-review-card',
  imports: [CommonModule],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.scss',
  standalone: true,
})
export class ReviewCardComponent {
  @Input() review!: IReview;
  @Output() statusChanged = new EventEmitter<void>();

  getStatusClass(): string {
    switch (this.review.status) {
      case 'WAITING_FOR_PUBLICATION':
        return 'status-circle yellow';
      case 'PUBLISHED':
        return 'status-circle green';
      case 'REJECTED':
        return 'status-circle red';
      default:
        return 'status-circle';
    }
  }
  publishReview(): void {
    this.review.status = 'PUBLISHED';
    this.statusChanged.emit();
  }
  rejectReview(): void {
    this.review.status = 'REJECTED';
    this.statusChanged.emit();
  }
}
