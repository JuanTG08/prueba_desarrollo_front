import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'login',
    loadChildren: () => import('./screens/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./screens/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./screens/home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    loadChildren: () => import('./screens/home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'vehicle',
    loadChildren: () => import('./screens/vehicle/vehicle.module').then((m) => m.VehicleModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'admin-profiles',
    loadChildren: () => import('./screens/admin-profile/admin-profile.module').then((m) => m.AdminProfileModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'not-permits',
    loadChildren: () => import('./screens/error/error.module').then((m) => m.ErrorModule),
  },
  {
    path: 'underConstruction',
    loadChildren: () => import('./screens/error/error.module').then((m) => m.ErrorModule),
  },
  {
    path: '**',
    loadChildren: () => import('./screens/error/error.module').then((m) => m.ErrorModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
