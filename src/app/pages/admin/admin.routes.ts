import { Routes } from '@angular/router';
import { AdminLayoutComponent } from '../../layout/admin-layout/admin-layout.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then((m) => m.AdminDashboardComponent),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./orders/orders.component').then((m) => m.AdminOrdersComponent),
      },
      {
        path: 'templates',
        loadComponent: () =>
          import('./templates/templates.component').then((m) => m.AdminTemplatesComponent),
      },
      {
        path: 'publish',
        loadComponent: () =>
          import('./publish/publish.component').then((m) => m.PublishComponent),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./users/users.component').then((m) => m.AdminUsersComponent),
      },
      {
        path: 'audit',
        loadComponent: () =>
          import('./audit/audit.component').then((m) => m.AdminAuditComponent),
      },
    ],
  },
];
