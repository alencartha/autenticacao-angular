import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './core/guard/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../app/core/components/auth/auth.module').then(module => module.AuthModule)
  },
  {
    path: 'admin',
    canActivateChild: [AuthGuardGuard],
    loadChildren: () => import('../app/components/admin/admin.module').then(module => module.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
