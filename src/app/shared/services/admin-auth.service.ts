import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  public isAdminAuthenticated$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor() {}

  /**
   * Sets the admin authentication status.
   * @param isAuthenticated - The new authentication status.
   */
  setAdminAuthentication(isAuthenticated: boolean): void {
    this.isAdminAuthenticated$.next(isAuthenticated);
  }

  /**
   * Checks if the admin is authenticated.
   * @returns True if authenticated, false otherwise.
   */
  isAdminAuthenticated(): boolean {
    return this.isAdminAuthenticated$.getValue();
  }
}
