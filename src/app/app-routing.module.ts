import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthorizationGuard} from "./guards/authorization.guard";
import {NotAuthorizationGuard} from "./guards/not-authorization.guard";
import {LayoutComponent} from "./components/shared/layout/layout.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/login' },
      {
        path: 'login',
        loadChildren: () => import('./components/authorization/login/login.component').then(m => m.LoginModule),
        canActivate: [NotAuthorizationGuard]
      },
      {
        path: 'vehicles',
        loadChildren: () => import('./components/vehicles/vehicles.module').then(m => m.StudentModule),
        canActivate: [AuthorizationGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
