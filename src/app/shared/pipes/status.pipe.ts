import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe to transform reservation status into a human-readable format.
 * It converts the status codes 'WAITING_FOR_CONFIRMATION', 'CONFIRMED', and 'CANCELED'
 * into their respective string representations.
 */
@Pipe({
  name: 'status',
})
export class StatusPipe implements PipeTransform {
  /**
   * Transforms the reservation status into a human-readable format.
   * @param status The reservation status code.
   * @returns The human-readable status string.
   */
  transform(
    status: 'WAITING_FOR_CONFIRMATION' | 'CONFIRMED' | 'CANCELED'
  ): unknown {
    switch (status) {
      case 'WAITING_FOR_CONFIRMATION':
        return 'Čeka na potvrdu';
      case 'CONFIRMED':
        return 'Potvrđeno';
      case 'CANCELED':
        return 'Otkazano';
      default:
        return null;
    }
  }
}
