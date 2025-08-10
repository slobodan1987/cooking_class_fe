import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, timer } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class HttpInteractionService {
  // constructor(private httpClient: HttpClient) {}
  constructor() {}

  authenticateAdmin(password: string): Observable<any> {
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

  checkReviewPageIdParameter(id: string): Observable<any> {
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
}
