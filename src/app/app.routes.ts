import { Routes } from '@angular/router';
import { AdminPageComponent } from './shared/components/admin-page/admin-page.component';
import { HomeComponent } from './shared/components/home/home.component';
import { LeaveReviewComponent } from './shared/components/leave-review/leave-review.component';
import { reviewGuard } from './shared/guards/review.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'auth', component: AuthPageComponent },
  {
    path: 'admin',
    component: AdminPageComponent,
  },
  {
    path: 'review/:id',
    component: LeaveReviewComponent,
    canActivate: [reviewGuard],
  },
  { path: '**', redirectTo: '' },
];
