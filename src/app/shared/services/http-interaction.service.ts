import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, timer } from 'rxjs';

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
    return timer(1000).pipe(
      map(() => {
        if (password === 'test12345') {
          return { success: true };
        } else {
          throw new Error('Invalid password');
        }
      })
    );
  }
}
