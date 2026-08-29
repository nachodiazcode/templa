import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'templates',
    loadChildren: () =>
      import('./pages/catalog/catalog.routes').then((m) => m.CATALOG_ROUTES),
  },
  {
    path: 'powerpoint',
    loadComponent: () =>
      import('./pages/office/office.component').then((m) => m.OfficeComponent),
    data: { format: 'pptx' },
  },
  {
    path: 'word',
    loadComponent: () =>
      import('./pages/office/office.component').then((m) => m.OfficeComponent),
    data: { format: 'docx' },
  },
  {
    path: 'checkout/result',
    loadComponent: () =>
      import('./pages/checkout-result/checkout-result.component').then(
        (m) => m.CheckoutResultComponent,
      ),
  },
  {
    path: 'descargas',
    loadComponent: () =>
      import('./pages/downloads/downloads.component').then((m) => m.DownloadsComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'mis-compras',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/my-orders/my-orders.component').then((m) => m.MyOrdersComponent),
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadChildren: () =>
      import('./pages/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  { path: '**', redirectTo: '' },
];
