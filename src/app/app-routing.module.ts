import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import("./home/features/home.module").then(
        (m) => m.HomeModule
      )
  },
  {
    path: 'activities',
    loadChildren: () =>
      import("./activities/features/activities-shell/activities-shell.module").then(
        (m) => m.ActivitiesShellModule
      )
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: "full"
  },
  { path: '**', component: NotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
