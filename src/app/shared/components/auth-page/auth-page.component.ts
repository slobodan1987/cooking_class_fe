import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { catchError, of, Subscription, tap } from 'rxjs';
import { HttpInteractionService } from '../../services/http-interaction.service';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
})
export class AuthPageComponent implements OnDestroy {
  password = '';
  errorMessage = '';
  isLoading = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private httpInteractionService: HttpInteractionService
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
              // Navigate to admin page (guard will now allow access)
              this.router.navigate(['/admin']);
            }
            this.isLoading = false;
          }),
          catchError(() => {
            this.errorMessage = 'Netočna lozinka. Pokušajte ponovno.';
            this.password = '';
            this.isLoading = false;
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
