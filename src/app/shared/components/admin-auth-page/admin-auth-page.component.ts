import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, Subscription, tap } from 'rxjs';
import { AdminAuthService } from '../../services/admin-auth.service';
import { HttpInteractionService } from '../../services/http-interaction.service';

/**
 * Component for admin authentication page.
 * Allows admin to enter a password to access the admin section.
 */
@Component({
  selector: 'app-admin-auth-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-auth-page.component.html',
  styleUrl: './admin-auth-page.component.scss',
})
export class AdminAuthPageComponent implements OnDestroy {
  password = '';
  errorMessage = '';
  isLoading = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private httpInteractionService: HttpInteractionService,
    private adminAuthService: AdminAuthService
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  validatePassword(): void {
    if (!this.password) {
      this.errorMessage = 'Molimo unesite lozinku.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.subscriptions.push(
      this.httpInteractionService
        .authenticateAdmin(this.password)
        .pipe(
          tap((response) => {
            if (response.success) {
              this.isLoading = false;
              this.adminAuthService.setAdminAuthentication(true);
            } else {
              this.errorMessage = 'Greška. Pokušajte ponovno.';
              this.password = '';
              this.isLoading = false;
              this.adminAuthService.setAdminAuthentication(false);
            }
          }),
          catchError(() => {
            this.errorMessage = 'Greška. Pokušajte ponovno.';
            this.password = '';
            this.isLoading = false;
            this.adminAuthService.setAdminAuthentication(false);
            return of(null); // Handle error gracefully
          })
        )
        .subscribe()
    );
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.validatePassword();
    }
  }
}
