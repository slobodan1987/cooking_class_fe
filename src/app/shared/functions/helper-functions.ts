import { IReservation } from '../models/model';

/**
 * Function to sort reservations based on their status and date.
 *
 * - Reservations are sorted by status first, then by date.
 * - Statuses are prioritized as follows:
 *   - 'WAITING_FOR_CONFIRMATION' (highest priority, yellow)
 *   - 'CONFIRMED' (medium priority, green)
 *   - 'CANCELED' (lowest priority, red)
 * - Within the same status, reservations are sorted by date (oldest first).
 * @param reservations Array of reservations to be sorted
 * @returns Sorted array of reservations
 */
export function sortReservations(reservations: IReservation[]): IReservation[] {
  return reservations.sort((a, b) => {
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
