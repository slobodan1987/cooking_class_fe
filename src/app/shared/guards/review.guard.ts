import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, tap } from 'rxjs/operators';
import { HttpInteractionService } from '../services/http-interaction.service';

export const reviewGuard: CanActivateFn = (
  route,
  state
): Observable<boolean> => {
  const httpInteractionService = inject(HttpInteractionService);

  // Extract the 'id' parameter from the route
  const id = route.params['id'];
  // Start an RxJS pipeline with the parameter
  return of(id).pipe(
    concatMap((paramId) =>
      httpInteractionService.checkReviewPageIdParameter(paramId).pipe(
        tap((response) => {
          if (response.success) {
            return of(true); // If the ID is valid, return true
          } else {
            // handle error state if needed
            return of(false);
          }
        }),
        catchError(() => {
          return of(false); // Handle error gracefully
        })
      )
    )
  );
};
