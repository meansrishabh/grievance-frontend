import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'admin/dashboard'
  },
  {
    path: 'admin/dashboard',
    component: DashboardComponent
  },
  {
    path: '**',
    redirectTo: 'admin/dashboard'
  }
];
