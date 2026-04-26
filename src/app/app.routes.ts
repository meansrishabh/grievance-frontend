import { Routes } from '@angular/router';
import { CallerDashboardComponent } from './features/caller/caller-dashboard.component';
import { CitizenStatusComponent } from './features/citizen/citizen-status.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LoginComponent } from './features/login/login.component';
import { ManagementDashboardComponent } from './features/management/management-dashboard.component';
import { SuperAdminComponent } from './features/super-admin/super-admin.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'citizen',
    component: CitizenStatusComponent
  },
  {
    path: 'caller',
    component: CallerDashboardComponent
  },
  {
    path: 'management',
    component: ManagementDashboardComponent
  },
  {
    path: 'super-admin',
    component: SuperAdminComponent
  },
  {
    path: 'admin/dashboard',
    component: DashboardComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
