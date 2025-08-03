import { Pipe, PipeTransform } from '@angular/core';

/**
 * ReviewStatusPipe transforms the review status into a human-readable string.
 * It is used to display the status of reviews in a user-friendly format.
 * The statuses include 'WAITING_FOR_PUBLICATION', 'PUBLISHED', and 'REJECTED'.
 */
// Usage: {{ review.status | reviewStatus }}
// This pipe can be used in templates to display the status of a review dynamically.
// Make sure to import this pipe in your module to use it in your components.
// Example: {{ review.status | reviewStatus }} will return 'Čeka na objavu' if the status is 'WAITING_FOR_PUBLICATION'.
// This pipe is useful for displaying the status of reviews in a clear and concise manner.
@Pipe({
  name: 'reviewStatus',
})
export class ReviewStatusPipe implements PipeTransform {
  /**
   * Transforms the review status into a human-readable string.
   * @param status - The status of the review to be transformed.
   * It can be one of the following: 'WAITING_FOR_PUBLICATION', 'PUBLISHED', or 'REJECTED'.
   *
   * This method transforms the review status into a human-readable string.
   * It returns:
   * - 'Čeka na objavu' for 'WAITING_FOR_PUBLICATION'
   * - 'Objavljena' for 'PUBLISHED'
   * - 'Odbijena' for 'REJECTED'
   * - null for any other status
   * @returns string | null - The transformed status string or null if the status is not recognized.
   */
  transform(
    status: 'WAITING_FOR_PUBLICATION' | 'PUBLISHED' | 'REJECTED'
  ): string | null {
    switch (status) {
      case 'WAITING_FOR_PUBLICATION':
        return 'Čeka na objavu';
      case 'PUBLISHED':
        return 'Objavljena';
      case 'REJECTED':
        return 'Odbijena';
      default:
        return null;
    }
  }
}
