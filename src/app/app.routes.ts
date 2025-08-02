import { Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { AdminPageComponent } from './shared/admin-page/admin-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminPageComponent },
  { path: '**', redirectTo: '' },
];
