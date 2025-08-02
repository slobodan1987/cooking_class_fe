import { IBEState } from './model';
import { v4 as uuidv4 } from 'uuid';

/**
 * Mock data for the booking engine state.
 * This is used for testing and development purposes.
 * It simulates the initial state of the booking engine with predefined dates and company data.
 */
export const mockEmptyBeState: IBEState = {
  dates: [
    {
      id: uuidv4(),
      bookings: [],
      date: '2025-07-16',
      status: 'AVAILABLE',
    },
    {
      id: uuidv4(),
      bookings: [],
      date: '2025-07-17',
      status: 'AVAILABLE',
    },
    {
      id: uuidv4(),
      bookings: [],
      date: '2025-07-18',
      status: 'AVAILABLE',
    },
  ],
  companyData: {
    name: 'Cooking Class Plitvice',
    googleCoordinates: 'Rastovača 14/1, Plitvička jezera',
    address: 'Mukinje 33, Plitvička jezera',
    phone: '+385 91 9146693',
    email: 'cooking.class.plitvice@gmail.com',
    startTime: '17:00',
    endTime: '21:00',
    minPersonsPerClass: 2,
    maxPersonsPerClass: 12,
    preparationTimeInHours: 24,
    pricePerPerson: 80,
  },
};

/** * Mock data for the booking engine state with dates.
 * This is used for testing and development purposes.
 * It simulates the initial state of the booking engine with predefined dates and company data.
 */
export const mockBeStateWithDates: IBEState = {
  dates: [],
  companyData: {
    name: 'Cooking Class Plitvice',
    googleCoordinates: 'Rastovača 14/1, Plitvička jezera',
    address: 'Mukinje 33, Plitvička jezera',
    phone: '+385 91 9146693',
    email: 'cooking.class.plitvice@gmail.com',
    startTime: '17:00',
    endTime: '21:00',
    minPersonsPerClass: 2,
    maxPersonsPerClass: 12,
    preparationTimeInHours: 24,
    pricePerPerson: 80,
  },
};

/**
 * This interface defines the structure of a result object.
 */
export interface IResult {
  success: boolean;
  message?: string;
}

/**
 * This interface defines the structure of a booking engine state result.
 */
export interface IBEStateResult {
  beState: IBEState;
  success: boolean;
  message?: string;
}
