import { Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'index-hr.html', component: HomeComponent },
  { path: '**', redirectTo: '' },
];
