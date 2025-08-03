/**
 * IReservation interface represents a reservation made by a user.
 * It contains all the necessary information about the reservation such as name, email, phone, date, guests, message, and status.
 * The status can be 'WAITING_FOR_CONFIRMATION', 'CONFIRMED', or 'CANCELED'.
 * This interface is used to manage reservations in the booking system.
 */
export interface IReservation {
  /**
   * name of the person making the reservation
   */
  name: string;
  /**
   * email of the person making the reservation
   */
  email: string;
  /**
   * phone number of the person making the reservation
   */
  phone: string;
  /**
   * date of the reservation
   */
  date: string;
  /**
   * number of guests for the reservation
   */
  guests: number;
  /**
   * message for the reservation
   * - this can be used to provide additional information or requests for the reservation
   * - it is optional and can be left empty
   */
  message?: string;
  /**
   * status of the reservation
   * - 'WAITING_FOR_CONFIRMATION': reservation is waiting for confirmation
   * - 'CONFIRMED': reservation is confirmed
   * - 'CANCELED': reservation is canceled
   */
  status: 'WAITING_FOR_CONFIRMATION' | 'CONFIRMED' | 'CANCELED';
}

/**
 * company data containing address, phone, email, start and end time, min and max persons per class, price per person, and max days in future
 */
export interface ICompanyData {
  /**
   * company name
   */
  name: string;
  /**
   * address of the company
   */
  address: string;
  /**
   * phone number of the company
   */
  phone: string;
  /**
   * email of the company
   */
  email: string;
  /**
   * start time of the booking
   */
  startTime: string;
  /**
   * end time of the booking
   */
  endTime: string;
  /**
   * minimum number of persons per class
   */
  minPersonsPerClass: number;
  /**
   * maximum number of persons per class
   */
  maxPersonsPerClass: number;
  /**
   * price per person for the booking (in euros)
   * - this is the price that will be charged for each person in the booking
   */
  pricePerPerson: number;

  /**
   * preparation time for the event (in hours)
   */
  preparationTimeInHours: number;

  /**
   * google coordinates for the address
   */
  googleCoordinates: string;
}

/**
 * IReview interface represents a review made by a user.
 * It contains the name of the reviewer, their email, rating, and the review text.
 * This interface is used to manage reviews in the application.
 */
export interface IReview {
  /**
   * name of the reviewer
   */
  author: string;
  /**
   * email of the reviewer
   */
  email: string;
  /**
   * rating given by the reviewer (1 to 5 stars)
   */
  rating: number;
  /**
   * review text provided by the reviewer
   */
  comment: string;
}
