import { Injectable } from '@angular/core';
import { map, Observable, timer } from 'rxjs';
import {
  ICompanyData,
  IHttpResult,
  IReservation,
  IReview,
} from '../models/model';
import {
  companyDataMock,
  manuallyExcludedDaysMock,
  reservationsMock,
} from '../models/mock';

@Injectable({
  providedIn: 'root',
})
export class HttpInteractionService {
  // constructor(private httpClient: HttpClient) {}
  constructor() {}

  authenticateAdmin(password: string): Observable<IHttpResult<void>> {
    // return this.httpClient.post('/api/authenticate', { password });
    // Simulating an HTTP request with a delay for demonstration purposes
    // In a real application, replace this with an actual HTTP request to your backend
    return timer(300).pipe(
      map(() => {
        if (password === 'test12345') {
          return { success: true };
        } else {
          throw new Error('Invalid password');
        }
      })
    );
  }

  checkReviewPageIdParameter(id: string): Observable<IHttpResult<void>> {
    // Simulating an HTTP request with a delay for demonstration purposes
    // In a real application, replace this with an actual HTTP request to your backend
    return timer(200).pipe(
      map(() => {
        const validId = 'b8a1c2d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d';
        if (id === validId) {
          return { success: true };
        } else {
          throw new Error('Invalid ID');
        }
      })
    );
  }

  updateCompanyData(req: ICompanyData): Observable<IHttpResult<void>> {
    // Simulating an HTTP request with a delay for demonstration purposes
    // In a real application, replace this with an actual HTTP request to your backend
    return timer(300).pipe(
      map(() => {
        return { success: true };
      })
    );
  }

  getCompanyData(): Observable<IHttpResult<ICompanyData>> {
    // Simulating an HTTP request with a delay for demonstration purposes
    // In a real application, replace this with an actual HTTP request to your backend
    return timer(300).pipe(
      map(() => {
        const companyData: ICompanyData = companyDataMock;
        return { success: true, data: companyData };
      })
    );
  }

  getManuallyExcludedDays(): Observable<IHttpResult<string[]>> {
    // Simulating an HTTP request with a delay for demonstration purposes
    // In a real application, replace this with an actual HTTP request to your backend
    return timer(300).pipe(
      map(() => {
        const excludedDays = manuallyExcludedDaysMock;
        return { success: true, data: excludedDays };
      })
    );
  }

  setManuallyExcludedDays(days: string[]): Observable<IHttpResult<void>> {
    // Simulating an HTTP request with a delay for demonstration purposes
    // In a real application, replace this with an actual HTTP request to your backend
    return timer(300).pipe(
      map(() => {
        return { success: true };
      })
    );
  }

  getReservations(): Observable<IHttpResult<IReservation[]>> {
    // Simulating an HTTP request with a delay for demonstration purposes
    // In a real application, replace this with an actual HTTP request to your backend
    return timer(300).pipe(
      map(() => {
        const reservations: IReservation[] = reservationsMock;
        return { success: true, data: reservations };
      })
    );
  }

  updateReservationStatus(
    id: string,
    status: 'WAITING_FOR_CONFIRMATION' | 'CONFIRMED' | 'CANCELED'
  ): Observable<IHttpResult<void>> {
    // Simulating an HTTP request with a delay for demonstration purposes
    // In a real application, replace this with an actual HTTP request to your backend
    return timer(300).pipe(
      map(() => {
        return { success: true };
      })
    );
  }

  updateReviewStatus(
    id: string,
    status: 'WAITING_FOR_PUBLICATION' | 'PUBLISHED' | 'REJECTED'
  ): Observable<IHttpResult<void>> {
    // Simulating an HTTP request with a delay for demonstration purposes
    // In a real application, replace this with an actual HTTP request to your backend
    return timer(300).pipe(
      map(() => {
        return { success: true };
      })
    );
  }

  createReservation(reservation: IReservation): Observable<IHttpResult<void>> {
    // Simulating an HTTP request with a delay for demonstration purposes
    // In a real application, replace this with an actual HTTP request to your backend
    return timer(300).pipe(
      map(() => {
        return { success: true };
      })
    );
  }

  leaveReview(review: IReview): Observable<IHttpResult<void>> {
    // Simulating an HTTP request with a delay for demonstration purposes
    // In a real application, replace this with an actual HTTP request to your backend
    return timer(300).pipe(
      map(() => {
        return { success: true };
      })
    );
  }
}
