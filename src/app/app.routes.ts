import { Routes } from '@angular/router';
import { AdminPageComponent } from './shared/components/admin-page/admin-page.component';
import { HomeComponent } from './shared/components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'auth', component: AuthPageComponent },
  {
    path: 'admin',
    component: AdminPageComponent,
  },
  { path: '**', redirectTo: '' },
];
