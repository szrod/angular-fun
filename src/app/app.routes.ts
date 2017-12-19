import { Route } from '@angular/router';
import { HomeComponent } from './landing/home/home.component';

export const appRoutes: Route[] = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {path: '', component: HomeComponent, data: {state: ''}},
  {path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', data: {state: 'dashboard'}}
];
