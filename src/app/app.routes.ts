import { Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { AdminPageComponent } from './shared/components/admin-page/admin-page.component';
import { AuthPageComponent } from './shared/components/auth-page/auth-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'auth', component: AuthPageComponent },
  {
    path: 'admin',
    component: AdminPageComponent,
  },
  { path: '**', redirectTo: '' },
];
