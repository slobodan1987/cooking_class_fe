import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
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
        map((response) => response.success),
        catchError(() => of(false))
      )
    )
  );
};
